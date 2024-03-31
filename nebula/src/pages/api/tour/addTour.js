// api/tour/addTour.js
import db from "../../../lib/db"

async function tourCreationHandler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const {
    tour_name,
    description,
    official_tag,
    images, // Assuming this is a JSON-encoded array of image URLs
    tags, // An array of tag names
    places, // An array of objects with place_name, latitude, and longitude
    user_email // Using email to identify the user
  } = req.body;

  // Find user by email
  const userResult = await db.query("SELECT user_id FROM users WHERE email = $1", [user_email]);
  if (userResult.rows.length === 0) {
    res.status(422).json({ message: "User does not exist!" });
    return;
  }
  const user_id = userResult.rows[0].user_id;

  try {
    await db.query("BEGIN");

    // Insert the new tour
    const tourInsertResult = await db.query(`
      INSERT INTO tour (tour_name, description, official_tag, user_id, images)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING tour_id;
    `, [tour_name, description, official_tag, user_id, images]);
    const tour_id = tourInsertResult.rows[0].tour_id;

    // Handle each place
    for (const place of places) {
      let place_id;

      // Attempt to find an existing place
      const placeResult = await db.query(
        "SELECT place_id FROM place WHERE latitude = $1 AND longitude = $2",
        [place.latitude, place.longitude]
      );

      if (placeResult.rows.length === 0) {
        // No place found; insert a new one
        const insertResult = await db.query(
          "INSERT INTO place (place_name, latitude, longitude) VALUES ($1, $2, $3) RETURNING place_id",
          [place.place_name, place.latitude, place.longitude]
        );
        place_id = insertResult.rows[0].place_id;
      } else {
        // Place exists, use its ID
        place_id = placeResult.rows[0].place_id;
      }

      // Associate the place with the tour
      await db.query("INSERT INTO tour_place (tour_id, place_id) VALUES ($1, $2)", [tour_id, place_id]);
    }

    // Handle each tag
    for (const tagName of tags) {
      let tagId;

      // Check if the tag already exists
      const tagQueryResult = await db.query(
        "SELECT tag_id FROM tag WHERE tag_name = $1",
        [tagName]
      );
      if (tagQueryResult.rows.length > 0) {
        tagId = tagQueryResult.rows[0].tag_id;
      } else {
        // Insert the new tag
        const tagInsertResult = await db.query(
          "INSERT INTO tag (tag_name) VALUES ($1) RETURNING tag_id",
          [tagName]
        );
        tagId = tagInsertResult.rows[0].tag_id;
      }

      // Associate the tag with the tour
      await db.query("INSERT INTO tour_tag (tour_id, tag_id) VALUES ($1, $2)", [tour_id, tagId]);
    }

    // Commit the transaction
    await db.query("COMMIT");

    res.status(201).json({ message: "Tour created with places and tags associated successfully." });
  } catch (error) {
    // Rollback in case of an error
    await db.query("ROLLBACK");
    console.error("Error creating tour:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export default tourCreationHandler;
