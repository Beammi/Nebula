import db from "../../../../lib/db";

export default async function handler(req, res) {
  // Ensure we're dealing with a GET request
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { displayName } = req.query;

  try {
    // First, get the user ID based on email and provider
    const userQuery = `
        SELECT user_id FROM users
        WHERE display_name = $1;
      `;
    const userValues = [displayName];

    const userResult = await db.query(userQuery, userValues);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = userResult.rows[0].user_id;

    // Now, query the database for tours along with their associated tags and places
    const tourQuery = `
      SELECT DISTINCT t.*, array_agg(DISTINCT tt.tag_name) AS tags, array_agg(DISTINCT p.place_name) AS places
      FROM tour t
      LEFT JOIN tour_tag ttag ON t.tour_id = ttag.tour_id
      LEFT JOIN tag tt ON ttag.tag_id = tt.tag_id
      LEFT JOIN tour_place tp ON t.tour_id = tp.tour_id
      LEFT JOIN place p ON tp.place_id = p.place_id
      WHERE t.user_id = $1
      GROUP BY t.tour_id;
    `;
    const tourValues = [userId];

    const tourResult = await db.query(tourQuery, tourValues);

    if (tourResult.rows.length > 0) {
      // Send back all matching tours along with their associated tags and places
      res.status(200).json(tourResult.rows);
    } else {
      // No tours found for this user
      res.status(404).json({ message: "No tours found for this user" });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
