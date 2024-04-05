// pages/api/bookmark/saveBookmark.js
import db from "../../../lib/db";

export default async function saveBookmark(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userId, tourId } = req.body;

  if (!userId || !tourId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Check if the bookmark already exists to avoid duplicates
    const checkQuery = `
      SELECT * FROM bookmark
      WHERE user_id = $1 AND tour_id = $2;
    `;
    const checkValues = [userId, tourId];
    const checkResult = await db.query(checkQuery, checkValues);

    if (checkResult.rows.length > 0) {
      return res.status(409).json({ message: "Bookmark already exists" });
    }

    // If the bookmark does not exist, insert a new record
    const insertBookmarkQuery = `
      INSERT INTO bookmark (user_id, tour_id)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const insertBookmarkValues = [userId, tourId];
    const { rows } = await db.query(insertBookmarkQuery, insertBookmarkValues);

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
