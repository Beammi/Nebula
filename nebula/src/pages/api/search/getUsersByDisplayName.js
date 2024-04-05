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

    // const nameQuery = `
    //     SELECT * FROM users
    //     WHERE display_name LIKE LOWER('%' || $1 || '%');
    // `
    const nameQuery = `
        SELECT users.*
        FROM users
        WHERE display_name LIKE LOWER('%' || $1 || '%');
    `


    const nameResult = await db.query(nameQuery, [searchKey])
    
    // Extracting display_name values from the rows
    const extractDisplayNames = nameResult.rows.map(row => row);
    // const extractDisplayNames = nameResult.rows.map(row => row.display_name);

    res.status(200).json(extractDisplayNames)

  } catch (error) {
    console.error("Database error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
