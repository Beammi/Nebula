import db from "../../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { tagName } = req.query;

  if (!tagName) {
    return res.status(400).json({ message: 'tagName is required' });
  }

  try {
    // const query = `
    //   SELECT nebu.images
    //   FROM nebu
    //   JOIN place ON nebu.place_id = place.place_id
    //   WHERE place.place_name ILIKE $1
    //   AND nebu.images IS NOT NULL AND array_length(nebu.images, 1) > 0
    //   ORDER BY RANDOM()
    //   LIMIT 1;
    // `;

    const queryOfficialTag = `
      SELECT nebu.images
      FROM nebu
      LEFT JOIN users ON nebu.user_id = users.user_id
      LEFT JOIN nebu_tag ON nebu.nebu_id = nebu_tag.nebu_id
      LEFT JOIN tag ON nebu_tag.tag_id = tag.tag_id
      WHERE nebu.official_tag = '${tagName}';
    `;

    const resultOfficialTag = await db.query(queryOfficialTag)
    const officialTagData = resultOfficialTag.rows;
    let combinedData = [...officialTagData];

    // finding in user defined tag
    const queryId = `
      SELECT nebu.*
      FROM nebu
      LEFT JOIN nebu_tag ON nebu.nebu_id = nebu_tag.nebu_id
      LEFT JOIN tag ON nebu_tag.tag_id = tag.tag_id
      WHERE tag.tag_name = '${tagName}';
    `;

    const resultId = await db.query(queryId)
    const nebuId = resultId.rows.map(row => row.nebu_id);

    if (nebuId.length > 0) {
      const queryUserTag = `
        SELECT nebu.images
        FROM nebu
        LEFT JOIN users ON nebu.user_id = users.user_id
        LEFT JOIN nebu_tag ON nebu.nebu_id = nebu_tag.nebu_id
        LEFT JOIN tag ON nebu_tag.tag_id = tag.tag_id
        WHERE nebu.nebu_id = '${nebuId[0]}';
      `;
    
      const resultQueryUserTag = await db.query(queryUserTag);
      
      if (resultQueryUserTag.rows.length > 0) {
        const userTagData = resultQueryUserTag.rows;
        combinedData = [...combinedData, ...userTagData];
      }
    }
    
    // res.status(200).json(combinedData);

    // const values = [`%${place_name}%`];

    // const result = await db.query(query, values);

    // if (combinedData.rows.length > 0 && combinedData.rows[0].images.length > 0) {
    //   // Shuffle the images array
    //   const images = combinedData.rows[0].images.sort(() => 0.5 - Math.random());
    //   // Select up to 3 images from the shuffled array
    //   const selectedImages = images.slice(0, 3);
    //   res.status(200).json({ images: selectedImages });
    // } else {
    //   res.status(404).json({ message: 'No images found for the given place name' });
    // }
    if (combinedData.length > 0 && combinedData[0].images.length > 0) {
      const images = combinedData[0].images.sort(() => 0.5 - Math.random());
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
