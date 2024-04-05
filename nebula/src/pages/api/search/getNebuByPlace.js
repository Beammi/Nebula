import db from "../../../lib/db"

export default async function getNebuByKeywordHandler(req, res) {
  // Ensure we're dealing with a GET request
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { placeName } = req.query

  if (!placeName) {
    return res.status(400).json({ message: "Searching keyword is required" })
  }

  try {
    const query = `
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
        LEFT JOIN place ON nebu.place_id = place.place_id
        LEFT JOIN nebu_tag ON nebu.nebu_id = nebu_tag.nebu_id
        LEFT JOIN tag ON nebu_tag.tag_id = tag.tag_id
        LEFT JOIN rating ON nebu.nebu_id = rating.nebu_id
        LEFT JOIN users ON nebu.user_id = users.user_id
      WHERE place.place_name = $1
      GROUP BY 
        nebu.nebu_id, place.latitude, place.longitude, users.email, place.place_name
      ORDER BY 
        nebu.created_time DESC;
    `
    const result = await db.query(query, [placeName])

    // const extractValue = result.rows.map(row => row.title);
    const extractValue = result.rows.map(row => row);

    res.status(200).json(extractValue)

  } catch (error) {
    console.error("Database error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
