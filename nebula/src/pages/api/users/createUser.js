import db from "../../../lib/db"

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      firstname,
      lastname,
      bio,
      display_name,
      email,
      hashed_password,
      salt,
      azure_ad_id,
      profile_picture_url,
      bg_picture_url,
    } = req.body

    try {
      const result = await db.query(
        "INSERT INTO users (firstname, lastname, bio, display_name, email, hashed_password, salt, azure_ad_id, profile_picture_url, bg_picture_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
        [
          firstname,
          lastname,
          bio,
          display_name,
          email,
          hashed_password,
          salt,
          azure_ad_id,
          profile_picture_url,
          bg_picture_url,
        ]
      )
      res.status(201).json(result.rows[0])
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Internal Server Error" })
    }
  } else {
    res.status(405).end() // Method Not Allowed
  }
}
