import db from "../../../../lib/db"

export default async function handleer(req, res) {
  // Ensure we're dealing with a GET request
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { email } = req.query

  if (!display_name) {
    return res.status(400).json({ message: "Searching keyword is required" })
  }

  try {
    const query = `
      SELECT display_name FROM users
      WHERE email = $1

    `
    const result = await db.query(query, [email])

    // const extractValue = result.rows.map(row => row.title);
    const extractValue = result.rows.map(row => row);

    res.status(200).json(extractValue)

  } catch (error) {
    console.error("Database error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
