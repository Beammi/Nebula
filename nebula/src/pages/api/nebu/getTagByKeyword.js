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
    const queryUserTag = `
        SELECT tag_name FROM tag
        WHERE LOWER(tag_name) LIKE LOWER('%${searchKey}%');
    `
    const resultUserTag = await db.query(queryUserTag)

    const queryOfficialTag = `
        SELECT official_tag FROM nebu
        WHERE LOWER(official_tag) LIKE LOWER('%${searchKey}%');
    `
    const resultOfficialTag = await db.query(queryOfficialTag)
    
    // Extracting values from the rows
    const extractValue = [
      ...resultUserTag.rows.map(row => row.tag_name),
      ...resultOfficialTag.rows.map(row => row.official_tag)
    ];

    res.status(200).json(extractValue)

  } catch (error) {
    console.error("Database error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
