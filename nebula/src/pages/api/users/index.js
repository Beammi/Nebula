// pages/api/users.js
const db = require('../../../lib/db');

export default async function handler(req, res) {
  try {
    const { rows } = await db.query('SELECT * FROM users');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Database query error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
