// pages/api/nebu/deleteNebu.js
import db from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    // Only allow DELETE requests, reject others
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { nebu_ids } = req.body; // Expecting an array of nebu_id

  if (!nebu_ids || !Array.isArray(nebu_ids) || nebu_ids.length === 0) {
    return res.status(400).json({ message: 'nebu_ids must be a non-empty array' });
  }

  // Assume nebu_ids is an array of IDs you're planning to delete
try {
    // Start a transaction
    await db.query('BEGIN');
  
    // First, delete related records from nebu_tag
    await db.query('DELETE FROM nebu_tag WHERE nebu_id = ANY($1::int[])', [nebu_ids]);

    await db.query('DELETE FROM bookmark WHERE nebu_id = ANY($1::int[])', [nebu_ids])
    // Then, delete the Nebu post(s)
    await db.query('DELETE FROM nebu WHERE nebu_id = ANY($1::int[])', [nebu_ids]);
  
    // Commit the transaction
    await db.query('COMMIT');
  
    res.status(200).json({ message: 'Deletion successful' });
  } catch (error) {
    // Rollback in case of an error
    await db.query('ROLLBACK');
    console.error('Deletion error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  
}
