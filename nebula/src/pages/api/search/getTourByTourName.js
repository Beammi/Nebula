import db from "../../../lib/db";

export default async function getTourById(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { tour_name } = req.query;

  if (!tour_name) {
    return res.status(400).json({ message: "Tour ID is required" });
  }

  try {

    const toursQuery = `
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
        LOWER(t.tour_name) LIKE LOWER('%' || $1 || '%')
      ;
    `;
    const toursResult = await db.query(toursQuery, [tour_name]);

    let enrichedTours = [];

    for (let tour of toursResult.rows) {
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
      const tagsResult = await db.query(tagsQuery, [tour.tour_id]);
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
      const placesResult = await db.query(placesQuery, [tour.tour_id]);

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
      const waypointsResult = await db.query(waypointsQuery, [tour.tour_id]);

      enrichedTours.push({
        ...tour,
        tags,
        places: placesResult.rows,
        waypoints: waypointsResult.rows,
      });
    }

    res.status(200).json(enrichedTours);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
