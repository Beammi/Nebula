// Assumes db is already set up to connect to your PostgreSQL database
import db from "../../../lib/db";

/**
 * Fetches a single Nebu post by its ID.
 * 
 * @param {number} nebuId ID of the Nebu post to fetch.
 * @returns {Promise<Object|null>} A promise that resolves to the Nebu post or null if not found.
 */
async function getNebuById(nebuId) {
    const queryText = `
      SELECT 
        nebu.*,
        place.latitude,
        place.longitude,
        array_agg(DISTINCT tag.tag_name) FILTER (WHERE tag.tag_name IS NOT NULL) AS tags,
        AVG(rating.rate) AS average_rating,
        users.email,
        place.place_name
      FROM 
        nebu
        JOIN place ON nebu.place_id = place.place_id
        LEFT JOIN nebu_tag ON nebu.nebu_id = nebu_tag.nebu_id
        LEFT JOIN tag ON nebu_tag.tag_id = tag.tag_id
        LEFT JOIN rating ON nebu.nebu_id = rating.nebu_id
        JOIN users ON nebu.user_id = users.user_id
      WHERE 
        nebu.nebu_id = $1
      GROUP BY 
        nebu.nebu_id, place.latitude, place.longitude, users.email, place.place_name;
    `;
  
    try {
      const res = await db.query(queryText, [nebuId]);
      return res.rows.length > 0 ? res.rows[0] : null;
    } catch (err) {
      console.error('Error executing query to fetch Nebu by ID:', err);
      throw err;
    }
}

export default getNebuById;
