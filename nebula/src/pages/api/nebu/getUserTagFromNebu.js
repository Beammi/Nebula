import db from "../../../lib/db"

export default async function getUserTagFromNebuHandler(req, res) {
  // Ensure we're dealing with a GET request
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { nebuName } = req.query

  if (!nebuName) {
    return res.status(400).json({ message: "Searching keyword is required" })
  }

  try {
    const query = `
        SELECT tag.tag_name FROM tag
        LEFT JOIN nebu_tag ON tag.tag_id = nebu_tag.tag_id
        LEFT JOIN nebu on nebu_tag.nebu_id = nebu.nebu_id
        WHERE nebu.title = $1;
    `

    // const result = await db.query(query)
    const result = await db.query(query, [nebuName]);
    
    // Extracting display_name values from the rows
    const extract = result.rows.map(row => row.tag_name);

    res.status(200).json(extract)

  } catch (error) {
    console.error("Database error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
