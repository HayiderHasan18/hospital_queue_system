const db = require('../../config/db');

const formatLocalTime = (timestamp) =>
  new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Africa/Addis_Ababa',
  });
exports.getCurrentServing = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        q.queueNo, 
        q.status, 
        q.arrival_time,
        q.called_at,
        CONCAT('Dr. ', u.first_name, ' ', u.last_name) AS doctor,
        d.room AS room
      FROM queue q
      JOIN doctors d ON q.assigned_doctor_id = d.id
      JOIN users u ON d.user_id = u.id
      WHERE q.status IN ('called', 'in_progress')
      ORDER BY 
        CASE q.status 
          WHEN 'in_progress' THEN 1
          WHEN 'called' THEN 2
          ELSE 3
        END, COALESCE(q.called_at, q.arrival_time) ASC
    `);

    const formatted = rows.map((q) => ({
      queueNo: q.queueNo,
      status: q.status,
      arrivalTime: formatLocalTime(q.arrival_time),
      doctor: q.doctor,
      room: q.room || '—',
    }));

    res.json(formatted); // Return all currently served/called patients
  } catch (err) {
    console.error('getCurrentServing error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

