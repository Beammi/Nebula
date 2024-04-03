import db from "../../../lib/db"

export default async function getNebuByTagHandler(req, res) {
  // Ensure we're dealing with a GET request
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { tagName } = req.query

  if (!tagName) {
    return res.status(400).json({ message: "Searching keyword is required" })
  }

  try {
    const queryOfficialTag = `
      SELECT tour.*, users.email, array_agg(DISTINCT tag.tag_name) AS tags, ARRAY_AGG(DISTINCT place.place_name) AS places
      FROM tour
      LEFT JOIN users ON tour.user_id = users.user_id
      LEFT JOIN tour_tag ON tour.tour_id = tour_tag.tour_id
      LEFT JOIN tag ON tour_tag.tag_id = tag.tag_id
      LEFT JOIN tour_place ON tour.tour_id = tour_place.tour_id
      LEFT JOIN place ON tour_place.place_id = place.place_id 
      WHERE tour.official_tag = '${tagName}'
      GROUP BY tour.tour_id, users.email
      ;
    `;

    const resultOfficialTag = await db.query(queryOfficialTag)
    const officialTagData = resultOfficialTag.rows;
    let combinedData = [...officialTagData];

    // finding in user defined tag
    const queryId = `
      SELECT tour.*
      FROM tour
      LEFT JOIN tour_tag ON tour.tour_id = tour_tag.tour_id
      LEFT JOIN tag ON tour_tag.tag_id = tag.tag_id
      WHERE tag.tag_name = '${tagName}';
    `;

    const resultId = await db.query(queryId)
    const nebuId = resultId.rows.map(row => row.tour_id);

    if (nebuId.length > 0) {
      const queryUserTag = `
        SELECT tour.*, users.email, array_agg(DISTINCT tag.tag_name) AS tags, ARRAY_AGG(DISTINCT place.place_name) AS places
        FROM tour
        LEFT JOIN users ON tour.user_id = users.user_id
        LEFT JOIN tour_tag ON tour.tour_id = tour_tag.tour_id
        LEFT JOIN tag ON tour_tag.tag_id = tag.tag_id
        LEFT JOIN tour_place ON tour.tour_id = tour_place.tour_id
        LEFT JOIN place ON tour_place.place_id = place.place_id
        WHERE tour.tour_id = '${nebuId[0]}'
        GROUP BY tour.tour_id, users.email;
      `;
    
      const resultQueryUserTag = await db.query(queryUserTag);
      
      if (resultQueryUserTag.rows.length > 0) {
        const userTagData = resultQueryUserTag.rows;
        combinedData = [...combinedData, ...userTagData];
      }
    }
    
    res.status(200).json(combinedData);

  } catch (error) {
    console.error("Database error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
