// pages/api/nebu/ratings/postRatingOfNebu.js
import db from "../../../../lib/db";

export default async function postRating(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { rate, ratingComment, userId, tourId } = req.body;

  if (!userId || !tourId || rate === undefined) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const insertRatingQuery = `
      INSERT INTO rating (rate, rating_comment, user_id, tour_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const insertRatingValues = [rate, ratingComment, userId, tourId];

    const { rows } = await db.query(insertRatingQuery, insertRatingValues);

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
