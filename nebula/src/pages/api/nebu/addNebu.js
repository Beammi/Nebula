import db from "../../../lib/db"
import { supabase } from "../../../lib/supabaseClient"

async function nebuCreationHandler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end() // Method Not Allowed
  }

  const {
    title,
    description,
    images, // Assuming this to be a JSON-encoded array of image URLs
    duration,
    start_time,
    end_time,
    official_tag,
    // user_id,
    place_id,
    open_sunday,
    open_monday,
    open_tuesday,
    open_wednesday,
    open_thursday,
    open_friday,
    open_saturday,
    tags,
    provider,
    email, // Assuming this is an array of tag names
  } = req.body

  // Optionally, validate the input data here
  let display_name = email.split("@")[0]
  display_name += provider

  const { rows } = await db.query(
    "SELECT * FROM users WHERE display_name = $1",
    [display_name]
  )

  if (rows.length == 0) {
    res.status(422).json({ message: "User does not exist!" })
    return;
  }
  const user = rows[0];
  const user_id = user.user_id

  try {
    // Start a transaction
    await db.query("BEGIN")

    // Insert the new nebu into the database
    const nebuInsertQuery = `
      INSERT INTO nebu (
        title,
        description,
        images,
        duration,
        start_time,
        end_time,
        official_tag,
        user_id,
        place_id,
        open_sunday,
        open_monday,
        open_tuesday,
        open_wednesday,
        open_thursday,
        open_friday,
        open_saturday,
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      RETURNING nebu_id;`

    const { rows: nebuInsertRows } = await db.query(nebuInsertQuery, [
      title,
      description,
      JSON.stringify(images), // Ensure images is properly encoded as JSON
      duration,
      start_time,
      end_time,
      official_tag,
      user_id,
      place_id,
      open_sunday,
      open_monday,
      open_tuesday,
      open_wednesday,
      open_thursday,
      open_friday,
      open_saturday,
    ])

    const nebuId = nebuInsertRows[0].nebu_id

    // Handle each tag
    for (const tagName of tags) {
      let tagId

      // Check if the tag already exists
      const tagQueryResult = await db.query(
        "SELECT tag_id FROM tag WHERE tag_name = $1",
        [tagName]
      )
      if (tagQueryResult.rows.length > 0) {
        tagId = tagQueryResult.rows[0].tag_id
      } else {
        // Insert the new tag
        const tagInsertResult = await db.query(
          "INSERT INTO tag (tag_name) VALUES ($1) RETURNING tag_id",
          [tagName]
        )
        tagId = tagInsertResult.rows[0].tag_id
      }

      // Associate the tag with the nebu
      await db.query("INSERT INTO nebu_tag (nebu_id, tag_id) VALUES ($1, $2)", [
        nebuId,
        tagId,
      ])
    }

    // Commit the transaction
    await db.query("COMMIT")

    res
      .status(201)
      .json({ message: "Nebu created and tags associated successfully." })
  } catch (error) {
    // Rollback in case of an error
    await db.query("ROLLBACK")
    console.error("Error creating nebu and handling tags:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export default nebuCreationHandler
