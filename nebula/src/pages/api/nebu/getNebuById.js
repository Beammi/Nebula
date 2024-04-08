import db from "../../../lib/db";

async function getNebuById(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { nebuId } = req.query;

  if (!nebuId) {
    return res.status(400).json({ message: "Nebu ID is required" });
  }

  try {
    const queryText = `
      SELECT 
        nebu.*,
        place.latitude,
        place.longitude,
        array_agg(DISTINCT tag.tag_name) FILTER (WHERE tag.tag_name IS NOT NULL) AS tags,
        AVG(rating.rate) FILTER (WHERE rating.rate IS NOT NULL) AS average_rating,
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
    const queryResult = await db.query(queryText, [nebuId]);
    if (queryResult.rows.length === 0) {
      return res.status(404).json({ message: "Nebu not found" });
    } else {
      return res.status(200).json(queryResult.rows[0]);
    }
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default getNebuById;
