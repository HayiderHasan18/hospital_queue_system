const db = require('../../config/db');
const formatLocalTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Africa/Addis_Ababa'
  });
};

exports.getDashboard = async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }
  try {
   
    const [patientResult] = await db.query(`
      SELECT id, cardNo FROM patients WHERE user_id = ?
    `, [userId]);

    if (patientResult.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const patientId = patientResult[0].id;
    const cardNo = patientResult[0].cardNo;
// Get latest queue entry
    const [queueRows] = await db.query(`
      SELECT id, queueNo, status, assigned_doctor_id, arrival_time
      FROM queue
      WHERE patient_id = ?
      ORDER BY arrival_time DESC
      LIMIT 1
    `, [patientId]);

    if (queueRows.length === 0) {
      return res.json({
        queueStatus: null,
        doctorAssignment: null
      });
    }

    const queue = queueRows[0];

    // Count patients ahead in the same 
    const [[aheadResult]] = await db.query(`
      SELECT COUNT(*) AS patientsAhead
      FROM queue
      WHERE assigned_doctor_id = ?
        AND status IN ('waiting', 'called', 'in_progress')
        AND id != ?
    `, [queue.assigned_doctor_id, queue.id]);

    const patientsAhead = aheadResult.patientsAhead;

    // Estimate visit time
    const estimatedVisit = new Date(Date.now() + patientsAhead * 10 * 60000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Africa/Addis_Ababa'
    });

    // Fetch doctor assignment
    let doctorAssignment = null;

    if (queue.assigned_doctor_id) {
      const [[doctorInfo]] = await db.query(`
        SELECT CONCAT('Dr. ', u.first_name, ' ', u.last_name) AS doctor,
               d.room
        FROM doctors d
        JOIN users u ON d.user_id = u.id
        WHERE d.id = ?
      `, [queue.assigned_doctor_id]);

      if (doctorInfo) {
        doctorAssignment = {
          doctor: doctorInfo.doctor,
          room: doctorInfo.room || 'Not Assigned'
        };
      }
    }

    res.json({
      queueStatus: {
        queueNo: queue.queueNo,
        status: queue.status,
        cardNo,
        patientsAhead,
        estimatedVisit,
        arrivalTime: formatLocalTime(queue.arrival_time)
      },
      doctorAssignment
    });

  } catch (err) {
    console.error('Error in getDashboard:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
};
exports.updateQueue = async (req, res) => {
  const { patientId, assignedDoctorId } = req.body;

  if (!patientId || !assignedDoctorId) {
    return res.status(400).json({ error: 'Missing patientId or assignedDoctorId' });
  }

  try {
    
    const [[patientUser]] = await db.query(`
      SELECT user_id FROM patients WHERE id = ?
    `, [patientId]);

    if (!patientUser) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const patientUserId = patientUser.user_id;
// update
    await db.query(`
      UPDATE queue
      SET assigned_doctor_id = ?, status = 'waiting'
      WHERE patient_id = ?
      ORDER BY arrival_time DESC
      LIMIT 1
    `, [assignedDoctorId, patientId]);

    //  Emit update 
    req.io?.emit('queue_updated', { userId: patientUserId });

    res.json({ success: true, message: 'Queue updated' });

  } catch (err) {
    console.error('Error in updateQueue:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
};
