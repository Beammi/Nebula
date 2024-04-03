import db from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    // Only allow DELETE requests, reject others
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { tour_ids } = req.body; // Expecting an array of tour_ids to be deleted

  if (!tour_ids || !Array.isArray(tour_ids) || tour_ids.length === 0) {
    return res.status(400).json({ message: 'tour_ids must be a non-empty array' });
  }

  try {
    // Start a transaction
    await db.query('BEGIN');

    // Loop through the array of tour_ids and delete related records
    for (const tour_id of tour_ids) {
      await db.query('DELETE FROM tour_place WHERE tour_id = $1', [tour_id]);
      await db.query('DELETE FROM tour_tag WHERE tour_id = $1', [tour_id]);
      await db.query('DELETE FROM waypoint WHERE tour_id = $1', [tour_id]);
      // Delete from other related tables if necessary

      // Delete the tour itself
      await db.query('DELETE FROM tour WHERE tour_id = $1', [tour_id]);
    }
  
    // Commit the transaction
    await db.query('COMMIT');
  
    res.status(200).json({ message: 'Tour deletion successful' });
  } catch (error) {
    // Rollback in case of an error
    await db.query('ROLLBACK');
    console.error('Tour deletion error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
