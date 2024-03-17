// pages/api/user/updateProfile.js
import db from "../../../lib/db"

async function updateProfileHandler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const {
    email,
    provider,
    firstname,
    lastname,
    profile_picture_url,
    bg_picture_url,
    bio,
  } = req.body

  if (!email || !provider) {
    return res
      .status(400)
      .json({ message: "Email  and provider are required to update profile." })
  }

  try {
    // Update the user profile
    const query = `
      UPDATE users
      SET firstname = COALESCE($3, firstname),
          lastname = COALESCE($4, lastname),
          profile_picture_url = COALESCE($5, profile_picture_url),
          bg_picture_url = COALESCE($6, bg_picture_url),
          bio = COALESCE($7, bio)
      WHERE email = $1 AND provider = $2
      RETURNING *;  -- Returns the updated user row
    `

    const values = [
      email,
      provider,
      firstname,
      lastname,
      profile_picture_url,
      bg_picture_url,
      bio,
    ]
    const { rows } = await db.query(query, values)

    if (rows.length === 0) {
      // No user was updated, which means the user does not exist
      return res.status(404).json({ message: "User not found." })
    }

    // Return the updated profile
    res.status(200).json(rows[0])
  } catch (error) {
    console.error("Database error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export default updateProfileHandler
