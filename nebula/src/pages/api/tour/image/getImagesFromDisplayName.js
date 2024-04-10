import db from "../../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { display_name } = req.query;

  if (!display_name) {
    return res.status(400).json({ message: 'display_name is required' });
  }

  try {
    const query = `
      SELECT nebu.images
      FROM nebu
      LEFT JOIN users ON nebu.user_id = users.user_id
      WHERE users.display_name = $1
      AND nebu.images IS NOT NULL AND array_length(nebu.images, 1) > 0
      ORDER BY RANDOM()
      LIMIT 1;
    `;
    // const values = [`%${email}%`];

    const result = await db.query(query, [display_name]);

    if (result.rows.length > 0 && result.rows[0].images.length > 0) {
      // Shuffle the images array
      const images = result.rows[0].images.sort(() => 0.5 - Math.random());
      // Select up to 3 images from the shuffled array
      const selectedImages = images.slice(0, 3);
      res.status(200).json({ images: selectedImages });
    } else {
      res.status(404).json({ message: 'No images found for the given place name' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
