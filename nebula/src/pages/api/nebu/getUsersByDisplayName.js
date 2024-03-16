import db from "../../../lib/db"

export default async function handler(req, res) {
  // Ensure we're dealing with a GET request
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { displayName } = req.query

  if (!displayName) {
    return res.status(400).json({ message: "displayName is required" })
  }

  try {
    // First, get the user ID based on email and provider
    const userQuery = `
        SELECT user_id FROM users
        WHERE email = $1 AND provider = $2;
      `
    const userValues = [email, provider]

    const userResult = await db.query(userQuery, userValues)

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" })
    }

    const userId = userResult.rows[0].user_id

    // Now, query the database for Nebu posts associated with the user ID
    const nebuQuery = `
      SELECT n.*, array_agg(t.tag_name) AS tags
      FROM nebu n
      LEFT JOIN nebu_tag nt ON n.nebu_id = nt.nebu_id
      LEFT JOIN tag t ON nt.tag_id = t.tag_id
      WHERE n.user_id = $1
      GROUP BY n.nebu_id
      ORDER BY n.created_time DESC; -- Correct SQL-style single-line comment
    `;
    const nebuValues = [userId]



  } catch (error) {
    console.error("Database error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
