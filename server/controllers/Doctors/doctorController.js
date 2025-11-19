const db = require('../../config/db');
const formatLocalTime = (timestamp) => {
  if (!timestamp) return null;
  return new Date(timestamp).toLocaleTimeString('en-US', {
    
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Africa/Addis_Ababa' 
  });
};

async function resolveDoctorIdFromUserId(userId) {
  const [rows] = await db.query('SELECT id FROM doctors WHERE user_id = ?', [userId]);
  return rows.length ? rows[0].id : null;
}
exports.getDoctorPatients = async (req, res) => {
  const userId = req.query.doctorId;

  try {
    const doctorId = await resolveDoctorIdFromUserId(userId);
    if (!doctorId) return res.status(404).json({ error: 'Doctor not found' });

    const [queuePatients] = await db.query(`
      SELECT 
        p.id, p.cardNo,
        CONCAT(u.first_name, ' ', u.last_name) AS name,
        p.age, p.address, p.phone,
        q.queueNo, q.status, q.arrival_time
      FROM queue q
      JOIN patients p ON q.patient_id = p.id
      JOIN users u ON p.user_id = u.id
      WHERE q.assigned_doctor_id = ?
        AND q.status IN ('waiting', 'called', 'in_progress')
      ORDER BY 
        CASE q.status 
          WHEN 'in_progress' THEN 1
          WHEN 'called' THEN 2
          ELSE 3
        END, q.arrival_time ASC
    `, [doctorId]);

    const [servedPatients] = await db.query(`
      SELECT 
        p.id, p.cardNo,
        CONCAT(u.first_name, ' ', u.last_name) AS name,
        p.age, p.address, p.phone,
        q.queueNo, q.status, q.served_at AS servedTime
      FROM queue q
      JOIN patients p ON q.patient_id = p.id
      JOIN users u ON p.user_id = u.id
      WHERE q.assigned_doctor_id = ?
        AND q.status = 'served'
      ORDER BY q.served_at DESC
    `, [doctorId]);
    servedPatients.forEach((patient) => {
      patient.servedTime = formatLocalTime(patient.servedTime);
    });

    res.json({ doctorId, queuePatients, servedPatients });
  } catch (err) {
    console.error('Error fetching patients:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.callPatient = async (req, res) => {
  const { patientId, doctorId: userId } = req.body;

  try {
    const doctorId = await resolveDoctorIdFromUserId(userId);
    if (!doctorId) return res.status(404).json({ error: 'Doctor not found' });

    const [rows] = await db.query(
      'SELECT id FROM queue WHERE patient_id = ? AND assigned_doctor_id = ? AND status = "waiting"',
      [patientId, doctorId]
    );
    if (!rows.length) return res.status(400).json({ error: 'Invalid patient state' });

    await db.query(
      'UPDATE queue SET status = "called", called_at = NOW() WHERE patient_id = ? AND assigned_doctor_id = ?',
      [patientId, doctorId]
    );

    const [queueEntry] = await db.query(`
      SELECT q.queueNo, u.first_name, u.last_name, d.room, p.user_id AS patientUserId
      FROM queue q
      JOIN doctors d ON q.assigned_doctor_id = d.id
      JOIN users u ON d.user_id = u.id
      JOIN patients p ON q.patient_id = p.id
      WHERE q.patient_id = ? AND q.assigned_doctor_id = ?
    `, [patientId, doctorId]);

    if (!queueEntry.length) return res.status(400).json({ error: 'Queue entry not found' });

    const { queueNo, first_name, last_name, room, patientUserId } = queueEntry[0];
    const payload = {
      queueNo,
      doctor: `Dr. ${first_name} ${last_name}`,
      room: room || 'Unknown'
    };

    req.io?.to(userId.toString()).emit('queue_updated');
    if (patientUserId) {
      req.io?.to(patientUserId.toString()).emit('queue_updated');
      req.io?.to(patientUserId.toString()).emit('queue_called', payload);
    }

    req.io?.emit('queue_called', payload);
    req.io?.emit('queue_updated');

    res.json({ success: true });
  } catch (err) {
    console.error('Error calling patient:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.startConsultation = async (req, res) => {
  const { patientId, doctorId: userId } = req.body;

  try {
    const doctorId = await resolveDoctorIdFromUserId(userId);
    if (!doctorId) return res.status(404).json({ error: 'Doctor not found' });

    const [rows] = await db.query(
      'SELECT id FROM queue WHERE patient_id = ? AND assigned_doctor_id = ? AND status = "called"',
      [patientId, doctorId]
    );
    if (!rows.length) return res.status(400).json({ error: 'Invalid patient state' });

    await db.query(
      'UPDATE queue SET status = "in_progress" WHERE patient_id = ? AND assigned_doctor_id = ?',
      [patientId, doctorId]
    );

    const [queueEntry] = await db.query(`
      SELECT q.queueNo, u.first_name, u.last_name, d.room, p.user_id AS patientUserId
      FROM queue q
      JOIN doctors d ON q.assigned_doctor_id = d.id
      JOIN users u ON d.user_id = u.id
      JOIN patients p ON q.patient_id = p.id
      WHERE q.patient_id = ? AND q.assigned_doctor_id = ?
    `, [patientId, doctorId]);

    if (!queueEntry.length) return res.status(400).json({ error: 'Queue entry not found' });

    const { queueNo, first_name, last_name, room, patientUserId } = queueEntry[0];
    const payload = {
      queueNo,
      doctor: `Dr. ${first_name} ${last_name}`,
      room: room || 'Unknown'
    };

    req.io?.to(userId.toString()).emit('queue_updated');
    if (patientUserId) {
      req.io?.to(patientUserId.toString()).emit('queue_updated');
      req.io?.to(patientUserId.toString()).emit('consultation_started', payload);
    }

    req.io?.emit('consultation_started', payload);
    req.io?.emit('queue_updated');

    res.json({ success: true });
  } catch (err) {
    console.error('Error starting consultation:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.markServed = async (req, res) => {
  const { patientId, doctorId: userId } = req.body;

  try {
    const doctorId = await resolveDoctorIdFromUserId(userId);
    if (!doctorId) return res.status(404).json({ error: 'Doctor not found' });

    const [rows] = await db.query(
      'SELECT id FROM queue WHERE patient_id = ? AND assigned_doctor_id = ? AND status = "in_progress"',
      [patientId, doctorId]
    );
    if (!rows.length) return res.status(400).json({ error: 'Invalid patient state' });

    await db.query(
      'UPDATE queue SET status = "served", served_at = NOW() WHERE patient_id = ? AND assigned_doctor_id = ?',
      [patientId, doctorId]
    );

    const [[{ user_id: patientUserId } = {}]] = await db.query(
      'SELECT user_id FROM patients WHERE id = ?',
      [patientId]
    );

    req.io?.to(userId.toString()).emit('queue_updated');
    if (patientUserId) req.io?.to(patientUserId.toString()).emit('queue_updated');

    req.io?.emit('queue_updated');

    res.json({ success: true });
  } catch (err) {
    console.error('Error marking served:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
