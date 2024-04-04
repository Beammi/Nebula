import db from "../../../../lib/db";

export default async function getRatings(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { tourId } = req.query;

  if (!tourId) {
    return res.status(400).json({ message: "tourId is required" });
  }

  try {
    // Query for individual ratings
    const ratingsQuery = `
      SELECT r.*, u.email, u.profile_picture_url FROM rating r
      JOIN users u ON r.user_id = u.user_id
      WHERE r.tour_id = $1;
    `;
    const ratingsValues = [tourId];
    const ratingsResult = await db.query(ratingsQuery, ratingsValues);

    // Query for average rating
    const avgRatingQuery = `
      SELECT AVG(rate) as average_rating FROM rating WHERE tour_id = $1;
    `;
    const avgRatingResult = await db.query(avgRatingQuery, ratingsValues);
    const averageRating = avgRatingResult.rows[0].average_rating ? parseFloat(avgRatingResult.rows[0].average_rating).toFixed(2) : 0;

    if (ratingsResult.rows.length > 0) {
      res.status(200).json({
        averageRating,
        ratings: ratingsResult.rows,
      });
    } else {
      // Even if there are no individual ratings, return the average rating (which would be 0)
      res.status(404).json({
        message: "No ratings found for this tour",
        averageRating,
      });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
