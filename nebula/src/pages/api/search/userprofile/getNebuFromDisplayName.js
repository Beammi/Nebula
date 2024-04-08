import db from "../../../../lib/db"

export default async function handler(req, res) {
  // Ensure we're dealing with a GET request
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { displayName } = req.query

  try {
    // First, get the user ID based on email and provider
    const userQuery = `
        SELECT user_id FROM users
        WHERE display_name = $1;
      `
    const userValues = [displayName]

    const userResult = await db.query(userQuery, userValues)

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" })
    }

    const userId = userResult.rows[0].user_id

    // Now, query the database for Nebu posts associated with the user ID
    // const nebuQuery = `
    //   SELECT n.*, array_agg(t.tag_name) AS tags
    //   FROM nebu n
    //   LEFT JOIN nebu_tag nt ON n.nebu_id = nt.nebu_id
    //   LEFT JOIN tag t ON nt.tag_id = t.tag_id
    //   WHERE n.user_id = $1
    //   GROUP BY n.nebu_id
    //   ORDER BY n.created_time DESC; -- Correct SQL-style single-line comment
    // `;

    const nebuQuery = `
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
      WHERE nebu.user_id = $1
      GROUP BY 
        nebu.nebu_id, place.latitude, place.longitude, users.email, place.place_name
      ORDER BY 
        nebu.created_time DESC;
    `
    

    // const { rows } = await db.query(nebuQuery, [userId])
    const result = await db.query(nebuQuery, [userId])
    const extractValue = result.rows.map(row => row);

    res.status(200).json(extractValue)
    
  } catch (error) {
    console.error("Database error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
