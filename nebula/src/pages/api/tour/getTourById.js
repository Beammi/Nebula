import db from "../../../lib/db";

export default async function getTourById(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { tour_id } = req.query;

  if (!tour_id) {
    return res.status(400).json({ message: "Tour ID is required" });
  }

  try {
    const tourQuery = `
      SELECT 
        t.tour_id, 
        t.tour_name, 
        t.description, 
        t.official_tag, 
        t.created_time,
        u.email AS creator_email
      FROM 
        tour t
      JOIN 
        users u ON t.user_id = u.user_id
      WHERE 
        t.tour_id = $1;
    `;
    const tourResult = await db.query(tourQuery, [tour_id]);

    if (tourResult.rows.length === 0) {
      return res.status(404).json({ message: "Tour not found" });
    }

    const tour = tourResult.rows[0];

    const tagsQuery = `
      SELECT 
        ARRAY_AGG(tg.tag_name) AS tags
      FROM 
        tour_tag tt
      JOIN 
        tag tg ON tt.tag_id = tg.tag_id
      WHERE 
        tt.tour_id = $1;
    `;
    const tagsResult = await db.query(tagsQuery, [tour_id]);
    const tags = tagsResult.rows[0]?.tags || [];

    const placesQuery = `
      SELECT 
        p.place_id, 
        p.place_name, 
        p.latitude, 
        p.longitude
      FROM 
        tour_place tp
      JOIN 
        place p ON tp.place_id = p.place_id
      WHERE 
        tp.tour_id = $1;
    `;
    const placesResult = await db.query(placesQuery, [tour_id]);

    const waypointsQuery = `
      SELECT 
        waypoint_id, 
        waypoint_name, 
        latitude, 
        longitude
      FROM 
        waypoint
      WHERE 
        tour_id = $1;
    `;
    const waypointsResult = await db.query(waypointsQuery, [tour_id]);

    const enrichedTour = {
      ...tour,
      tags,
      places: placesResult.rows,
      waypoints: waypointsResult.rows,
    };

    res.status(200).json(enrichedTour);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
