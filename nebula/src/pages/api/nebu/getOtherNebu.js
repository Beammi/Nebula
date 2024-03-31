import db from "../../../lib/db";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { place_name } = req.query;

    if (!place_name) {
        return res.status(400).json({ message: 'Place name is required' });
    }

    try {
        const query = `
            SELECT
                nebu.nebu_id,
                nebu.title,
                nebu.description,
                nebu.images,
                nebu.official_tag,
                pl.place_name,
                (SELECT email FROM users WHERE users.user_id = nebu.user_id) AS creator_email,
                (SELECT profile_picture_url FROM users WHERE users.user_id = nebu.user_id) AS creator_profile_picture,
                (SELECT array_agg(tag_name) FROM tag JOIN nebu_tag ON tag.tag_id = nebu_tag.tag_id WHERE nebu_tag.nebu_id = nebu.nebu_id) AS tags,
                AVG(rating.rate) AS average_rating
            FROM
                nebu
            LEFT JOIN rating ON rating.nebu_id = nebu.nebu_id
            JOIN place pl ON nebu.place_id = pl.place_id
            WHERE
                pl.place_name = $1
            GROUP BY nebu.nebu_id, pl.place_name;
        `;
        const values = [place_name];

        const { rows } = await db.query(query, values);
        if (rows.length > 0) {
            res.status(200).json(rows.map(row => ({
                ...row,
                average_rating: row.average_rating ? parseFloat(row.average_rating).toFixed(1) : "Not rated"
            })));
        } else {
            res.status(404).json({ message: 'No Nebu found for the given place name' });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
