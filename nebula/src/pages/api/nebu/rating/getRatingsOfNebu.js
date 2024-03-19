// pages/api/ratings/getRatings.js
import db from "../../../../lib/db";

export default async function getRatings(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { nebuId } = req.query;

  if (!nebuId) {
    return res.status(400).json({ message: "NebuId is required" });
  }

  try {
    const ratingsQuery = `
      SELECT r.*, u.email, u.profile_picture_url FROM rating r
      JOIN users u ON r.user_id = u.user_id
      WHERE r.nebu_id = $1;
    `;
    const ratingsValues = [nebuId];

    const { rows } = await db.query(ratingsQuery, ratingsValues);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({ message: "No ratings found for this Nebu" });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
