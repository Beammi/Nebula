import db from "../../../lib/db"

export default async function getTagByKeywordHandler(req, res) {
  // Ensure we're dealing with a GET request
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { searchKey } = req.query

  if (!searchKey) {
    return res.status(400).json({ message: "Searching keyword is required" })
  }

  try {
    const query = `
        SELECT tag_name FROM tag
        WHERE tag_name LIKE '%${searchKey}%';
    `

    const result = await db.query(query)
    
    // Extracting values from the rows
    const extractValue = result.rows.map(row => row.tag_name);

    res.status(200).json(extractValue)

  } catch (error) {
    console.error("Database error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
