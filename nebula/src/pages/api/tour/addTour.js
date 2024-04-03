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
    tags, // An array of tag names
    places, // An array of objects with place_name, latitude, and longitude
    waypoints,
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
      INSERT INTO tour (tour_name, description, official_tag, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING tour_id;
    `, [tour_name, description, official_tag, user_id]);
    const tour_id = tourInsertResult.rows[0].tour_id;

    for (const place of places) {
      let place_id;
      const placeResult = await db.query(
        "SELECT place_id FROM place WHERE place_name = $1 AND latitude = $2 AND longitude = $3",
        [place.name,place.latitude, place.longitude]
      );

      if (placeResult.rows.length === 0) {
        // No place found; insert a new one
        const insertResult = await db.query(
          "INSERT INTO place (place_name, latitude, longitude) VALUES ($1, $2, $3) RETURNING place_id",
          [place.name, place.latitude, place.longitude]
        );
        place_id = insertResult.rows[0].place_id;
      } else {
        // Place exists, use its ID
        place_id = placeResult.rows[0].place_id;
      }

      // Associate the place with the tour
      const checkTourPlaceExistence = await db.query(
        "SELECT 1 FROM tour_place WHERE tour_id = $1 AND place_id = $2",
        [tour_id, place_id]
      );
      
      if (checkTourPlaceExistence.rows.length === 0) {
        // Association does not exist, so we can insert it
        await db.query(
          "INSERT INTO tour_place (tour_id, place_id) VALUES ($1, $2)",
          [tour_id, place_id]
        );
      }
      // await db.query("INSERT INTO tour_place (tour_id, place_id) VALUES ($1, $2)", [tour_id, place_id]);
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
    if (Array.isArray(waypoints)) { // Ensure waypoints is an array
      for (const waypoint of waypoints) {
        const insertResult = await db.query(
          "INSERT INTO waypoint (waypoint_name, latitude, longitude, tour_id) VALUES ($1, $2, $3, $4) RETURNING waypoint_id;",
          [waypoint.name, waypoint.latitude, waypoint.longitude, tour_id]
        );
        // waypoint_id is available if needed: insertResult.rows[0].waypoint_id
      }
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
