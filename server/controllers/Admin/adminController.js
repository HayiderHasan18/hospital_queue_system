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

// Get all patients
exports.getPatients = async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT 
        p.id, 
        p.cardNo, 
        CONCAT(u.first_name, ' ', u.last_name) AS name,
        p.age,
        p.address, 
        p.phone,
        q.queueNo, 
        q.status,
        q.arrival_time,
        CONCAT(ud.first_name, ' ', ud.last_name) AS assignedDoctor
      FROM patients p
      INNER JOIN users u ON p.user_id = u.id
      LEFT JOIN queue q ON p.id = q.patient_id
      LEFT JOIN doctors d ON q.assigned_doctor_id = d.id
      LEFT JOIN users ud ON d.user_id = ud.id
    `);

    const formatted = results.map(r => ({
      ...r,
      arrival_time: formatLocalTime(r.arrival_time)
    }));

    res.json(formatted);
  } catch (err) {
    console.error(" Error in getPatients:", err);
    res.status(500).json({ message: "Database error in getPatients", error: err.message });
  }
};

// Get all doctors with patient count
exports.getDoctors = async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT 
        d.id, 
        CONCAT(u.first_name, ' ', u.last_name) AS name, 
        d.speciality, 
        d.room, 
        d.phone,  
        d.status,
        COUNT(q.id) AS patient_count
      FROM doctors d
      INNER JOIN users u ON d.user_id = u.id
      LEFT JOIN queue q ON d.id = q.assigned_doctor_id
      GROUP BY d.id
    `);

    res.json(results);
  } catch (err) {
    console.error("Error in getDoctors:", err);
    res.status(500).json({ message: "Database error in getDoctors", error: err.message });
  }
};

//  Get today's queue with local time
exports.getQueue = async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  try {
    const [results] = await db.query(`
      SELECT 
        id, 
        patient_id, 
        status, 
        arrival_time,
        called_at
      FROM queue
      WHERE DATE(arrival_time) = ?
    `, [today]);

    const formatted = results.map(q => ({
      ...q,
      arrival_time: formatLocalTime(q.arrival_time),
      called_at: formatLocalTime(q.called_at)
    }));

    res.json(formatted);
  } catch (err) {
    console.error(" Error in getQueue:", err);
    res.status(500).json({ message: "Database error in getQueue", error: err.message });
  }
};

//  Analytics summary
exports.getAnalytics = async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  try {
    const [summary] = await db.query(`
      SELECT 
        (SELECT COUNT(*) FROM patients) AS total_patients,
        (SELECT COUNT(*) FROM queue WHERE status = 'served' AND DATE(arrival_time) = ?) AS served_today,
        (SELECT COUNT(*) FROM doctors WHERE status = 'available') AS active_doctors,
       (SELECT IFNULL(AVG(TIMESTAMPDIFF(MINUTE, arrival_time, called_at)), 0)
 FROM queue 
 WHERE called_at IS NOT NULL AND DATE(arrival_time) = ?) AS avg_wait_time

    `, [today, today]);

    const [trend] = await db.query(`
      SELECT 
  DATE_FORMAT(arrival_time, '%a') AS day, 
  COUNT(*) AS served
FROM queue
WHERE status = 'served'
  AND arrival_time >= CURDATE() - INTERVAL 5 DAY
GROUP BY DATE_FORMAT(arrival_time, '%a')
ORDER BY MIN(arrival_time)
    `);

    const [load] = await db.query(`
      SELECT 
        CONCAT(u.first_name, ' ', u.last_name) AS doctor, 
        COUNT(q.id) AS patients
      FROM doctors d
      INNER JOIN users u ON d.user_id = u.id
      LEFT JOIN queue q ON d.id = q.assigned_doctor_id
      GROUP BY d.id
    `);

    const [statusSplit] = await db.query(`
      SELECT 
        status AS name, 
        COUNT(*) AS value
      FROM queue
      GROUP BY status
    `);

    res.json({
      ...summary[0],
      patientTrend: trend,
      doctorLoad: load,
      statusSplit
    });
  } catch (err) {
    console.error(" Error in getAnalytics:", err);
    res.status(500).json({ message: "Database error in getAnalytics", error: err.message });
  }
};

// Assign doctor to patient
exports.assignDoctor = async (req, res) => {
  const { patientId, doctorName } = req.body;

  try {
    const [[doctor]] = await db.query(`
      SELECT d.id
      FROM doctors d
      INNER JOIN users u ON d.user_id = u.id
      WHERE CONCAT(u.first_name, ' ', u.last_name) = ?
      LIMIT 1
    `, [doctorName]);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const doctorId = doctor.id;

    const [queueResult] = await db.query(
      `SELECT id FROM queue WHERE patient_id = ?`,
      [patientId]
    );

    if (queueResult.length > 0) {
      await db.query(`
        UPDATE queue 
        SET assigned_doctor_id = ?, status = 'waiting'
        WHERE patient_id = ?
      `, [doctorId, patientId]);

      // Get patient user ID
const [[patientUser]] = await db.query(
  `SELECT user_id FROM patients WHERE id = ?`,
  [patientId]
);

const patientUserId = patientUser?.user_id;
if (patientUserId) {
  req.io?.emit('queue_updated', { userId: patientUserId });
}


req.io?.emit('admin_queue_updated');
  

      return res.json({ success: true, updated: true });
    } else {
      await db.query(`
        INSERT INTO queue (patient_id, assigned_doctor_id, arrival_time, status)
        VALUES (?, ?, NOW(), 'waiting')
      `, [patientId, doctorId]);

      req.io?.emit('queue_updated');
      req.io?.emit('admin_queue_updated');  
      return res.json({ success: true, inserted: true });
    }
  } catch (err) {
    console.error(" Error in assignDoctor:", err);
    res.status(500).json({ error: "Assignment failed", details: err.message });
  }
};
