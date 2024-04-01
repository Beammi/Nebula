import db from "../../../lib/db"

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { email, provider } = req.query

  if (!email || !provider) {
    return res.status(400).json({ message: "Email and provider are required" })
  }

  try {
    const query = `
            SELECT
                b.bookmark_id,
                b.created_time,
                u.email,
                u.provider,
                CASE 
                    WHEN b.nebu_id IS NOT NULL THEN 'nebu'
                    WHEN b.tour_id IS NOT NULL THEN 'tour'
                END AS type,
                CASE 
                    WHEN b.nebu_id IS NOT NULL THEN n.title
                    WHEN b.tour_id IS NOT NULL THEN t.tour_name
                END AS title,
                CASE 
                    WHEN b.nebu_id IS NOT NULL THEN n.description
                    WHEN b.tour_id IS NOT NULL THEN t.description
                END AS description,
                CASE
                    WHEN b.nebu_id IS NOT NULL THEN n.images
                END AS images,
                CASE
                    WHEN b.nebu_id IS NOT NULL THEN n.official_tag
                    WHEN b.tour_id IS NOT NULL THEN t.official_tag
                END AS official_tag,
                CASE 
                    WHEN b.nebu_id IS NOT NULL THEN creator_nebu.email
                    WHEN b.tour_id IS NOT NULL THEN creator_tour.email
                END AS creator_email,
                CASE 
                    WHEN b.nebu_id IS NOT NULL THEN p.place_name
                END AS place_name,
                (
                    SELECT array_agg(tag.tag_name)
                    FROM tag
                    JOIN nebu_tag ON nebu_tag.tag_id = tag.tag_id
                    WHERE nebu_tag.nebu_id = b.nebu_id
                ) AS nebu_tags,
                (
                    SELECT array_agg(tag.tag_name)
                    FROM tag
                    JOIN tour_tag ON tour_tag.tag_id = tag.tag_id
                    WHERE tour_tag.tour_id = b.tour_id
                ) AS tour_tags,
                (
                    SELECT array_agg(pl.place_name)
                    FROM place pl
                    JOIN tour_place tp ON tp.place_id = pl.place_id
                    WHERE tp.tour_id = b.tour_id
                ) AS tour_places
            FROM
                users u
                LEFT JOIN bookmark b ON u.user_id = b.user_id
                LEFT JOIN nebu n ON b.nebu_id = n.nebu_id
                LEFT JOIN users creator_nebu ON n.user_id = creator_nebu.user_id
                LEFT JOIN place p ON n.place_id = p.place_id
                LEFT JOIN tour t ON b.tour_id = t.tour_id
                LEFT JOIN users creator_tour ON t.user_id = creator_tour.user_id
            WHERE
                u.email = $1 AND u.provider = $2
                AND (b.nebu_id IS NOT NULL OR b.tour_id IS NOT NULL);
        `
    const values = [email, provider]

    const { rows } = await db.query(query, values)

    if (rows.length > 0) {
      // Processing rows to merge nebu_tags and tour_tags into a single tags field
      // and handling tour places
      const processedRows = rows.map((row) => ({
        ...row,
        tags: row.type === "nebu" ? row.nebu_tags : row.tour_tags,
        places: row.type === "tour" ? row.tour_places : [],
        nebu_tags: undefined, // remove these as they are merged into 'tags'
        tour_tags: undefined,
        tour_places: undefined, // remove as it's merged into 'places'
      }))
      res.status(200).json(processedRows)
    } else {
      res
        .status(404)
        .json({
          message: "No bookmarks found for the given email and provider",
        })
    }
  } catch (error) {
    console.error("Database error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
