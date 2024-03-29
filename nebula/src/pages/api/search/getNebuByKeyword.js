import db from "../../../lib/db"

export default async function getNebuByKeywordHandler(req, res) {
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
      SELECT title FROM nebu
      WHERE LOWER(title) LIKE LOWER('%' || $1 || '%');
    `
    const result = await db.query(query, [searchKey])

    const extractValue = result.rows.map(row => row.title);

    res.status(200).json(extractValue)

  } catch (error) {
    console.error("Database error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
