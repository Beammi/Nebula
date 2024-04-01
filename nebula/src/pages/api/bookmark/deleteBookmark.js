// pages/api/bookbook/deleteBookmark.js
import db from "../../../lib/db";

export default async function deleteBookmark(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, bookmarkId } = req.body; // Assuming bookmarkId is passed to uniquely identify the bookmark to delete

  const userResult = await db.query("SELECT user_id FROM users WHERE email = $1", [email]);
  if (userResult.rows.length === 0) {
    res.status(422).json({ message: "User does not exist!" });
    return;
  }
  const user_id = userResult.rows[0].user_id;

  try {
    // Check if the bookmark exists
    const checkQuery = `
      SELECT * FROM bookmark
      WHERE user_id = $1 AND bookmark_id = $2;
    `;
    const checkValues = [user_id, bookmarkId];
    const checkResult = await db.query(checkQuery, checkValues);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    // If the bookmark exists, proceed to delete
    const deleteQuery = `
      DELETE FROM bookmark
      WHERE user_id = $1 AND bookmark_id = $2
      RETURNING *;
    `;
    const deleteValues = [user_id, bookmarkId];
    const { rows } = await db.query(deleteQuery, deleteValues);

    if (rows.length === 0) {
      // Just in case the bookmark was not deleted due to some reason
      return res.status(422).json({ message: "Unable to delete bookmark" });
    }

    res.status(200).json({ message: "Bookmark deleted successfully", bookmark: rows[0] });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
