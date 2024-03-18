import db from "../../../lib/db";

/**
 * Fetches Nebu posts within a specified radius of a given latitude and longitude.
 * 
 * @param {number} lat Latitude of the center point.
 * @param {number} lon Longitude of the center point.
 * @param {number} radius Radius in meters within which to find Nebu posts.
 * @returns {Promise<Array>} A promise that resolves to an array of Nebu posts.
 */
 async function getNebuFromGeoSpatial(latitude, longitude, radius) {
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
        ST_DWithin(
          ST_SetSRID(ST_MakePoint(place.latitude,place.longitude), 4326),
          ST_SetSRID(ST_MakePoint($1, $2), 4326),
          $3
        )
      GROUP BY 
        nebu.nebu_id, place.latitude, place.longitude, users.email, place.place_name
      ORDER BY 
        nebu.created_time DESC;
    `;
  
    try {
      const res = await db.query(queryText, [latitude, longitude, radius]);
      return res.rows;
    } catch (err) {
      console.error('Error executing geospatial query:', err);
      throw err;
    }
  }
   

export default getNebuFromGeoSpatial;
