// pages/api/bookmark/checkBookmarkNebu.js
import db from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { nebuId, userId } = req.query;

  if (!nebuId || !userId) {
    return res.status(400).json({ message: "nebuId and userId are required" });
  }

  try {
    const query = `
            SELECT 
                bookmark_id, 
                created_time, 
                user_id, 
                nebu_id 
            FROM 
                bookmark 
            WHERE 
                user_id = $1 AND nebu_id = $2;
        `;
    const values = [userId, nebuId];

    const { rows } = await db.query(query, values);

    if (rows.length > 0) {
      res.status(200).json({ 
        message: "Bookmark exists",
        bookmark: rows[0] 
      });
    } else {
      res.status(404).json({ message: "Bookmark not found" });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
