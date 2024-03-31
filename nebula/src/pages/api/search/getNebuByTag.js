import db from "../../../lib/db"

export default async function getNebuByTagHandler(req, res) {
  // Ensure we're dealing with a GET request
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { tagName } = req.query

  if (!tagName) {
    return res.status(400).json({ message: "Searching keyword is required" })
  }

  try {
    const queryOfficialTag = `
        SELECT nebu.*, users.email FROM nebu
        LEFT JOIN users ON nebu.user_id = users.user_id
        WHERE official_tag = '${tagName}';
    `
    const resultOfficialTag = await db.query(queryOfficialTag)

    const queryUserTag = `
      SELECT nebu.*, users.email FROM nebu
      LEFT JOIN nebu_tag ON nebu.nebu_id = nebu_tag.nebu_id
      LEFT JOIN tag ON nebu_tag.tag_id = tag.tag_id
      LEFT JOIN users ON nebu.user_id = users.user_id
      WHERE tag.tag_name = '${tagName}'
      ;
    `
    const resultUserTag = await db.query(queryUserTag)

    // const extractValue = resultOfficialTag.rows.map(row => row);
    // const extractValue = resultUserTag.rows.map(row => row);

    const extractValue = [
      ...resultUserTag.rows.map(row => row),
      ...resultOfficialTag.rows.map(row => row)
    ];

    res.status(200).json(extractValue)

  } catch (error) {
    console.error("Database error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
