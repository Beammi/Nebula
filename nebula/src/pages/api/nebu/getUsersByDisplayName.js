import db from "../../../lib/db"

export default async function getUsersByDisplayHandler(req, res) {
  // Ensure we're dealing with a GET request
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { searchKey } = req.query

  if (!searchKey) {
    return res.status(400).json({ message: "Searching keyword is required" })
  }

  try {
    const nameQuery = `
        SELECT display_name FROM users
        WHERE display_name LIKE '%${searchKey}%';
    `
    
    const nameResult = await db.query(nameQuery)
    res.status(200).json(nameResult)

  } catch (error) {
    console.error("Database error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
