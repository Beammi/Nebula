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
    // const queryOfficialTag = `
    //     SELECT nebu.*, users.email FROM nebu
    //     LEFT JOIN users ON nebu.user_id = users.user_id
    //     WHERE official_tag = '${tagName}';
    // `
    // const queryOfficialTag = `
    //     SELECT nebu.*, users.email, tag.tag_name FROM nebu
    //     LEFT JOIN users ON nebu.user_id = users.user_id
    //     LEFT JOIN nebu_tag ON nebu.nebu_id = nebu_tag.nebu_id
    //     LEFT JOIN tag ON nebu_tag.tag_id = tag.tag_id
    //     WHERE official_tag = '${tagName}';
    // `

    // const queryOfficialTag = `
    //   SELECT nebu.*, users.email, array_agg(DISTINCT tag.tag_name) AS tags
    //   FROM nebu
    //   LEFT JOIN users ON nebu.user_id = users.user_id
    //   LEFT JOIN nebu_tag ON nebu.nebu_id = nebu_tag.nebu_id
    //   LEFT JOIN tag ON nebu_tag.tag_id = tag.tag_id
    //   WHERE nebu.official_tag = '${tagName}' OR tag.tag_name = '${tagName}'
    //   GROUP BY nebu.nebu_id, users.email;
    // `;

    // const queryOfficialTag = `
    //   SELECT nebu.*, users.email, array_agg(DISTINCT tag.tag_name) AS tags
    //   FROM nebu
    //   LEFT JOIN users ON nebu.user_id = users.user_id
    //   LEFT JOIN nebu_tag ON nebu.nebu_id = nebu_tag.nebu_id
    //   LEFT JOIN tag ON nebu_tag.tag_id = tag.tag_id
    //   WHERE nebu.official_tag = '${tagName}' OR tag.tag_id = ANY (SELECT tag.tag_id WHERE tag.tag_name = '${tagName}')
    //   GROUP BY nebu.nebu_id, users.email;
    // `;

    const queryOfficialTag = `
      SELECT nebu.*, users.email, array_agg(DISTINCT tag.tag_name) AS tags
      FROM nebu
      LEFT JOIN users ON nebu.user_id = users.user_id
      LEFT JOIN nebu_tag ON nebu.nebu_id = nebu_tag.nebu_id
      LEFT JOIN tag ON nebu_tag.tag_id = tag.tag_id
      WHERE nebu.official_tag = '${tagName}'
      GROUP BY nebu.nebu_id, users.email;
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
        SELECT nebu.*, users.email, array_agg(DISTINCT tag.tag_name) AS tags
        FROM nebu
        LEFT JOIN users ON nebu.user_id = users.user_id
        LEFT JOIN nebu_tag ON nebu.nebu_id = nebu_tag.nebu_id
        LEFT JOIN tag ON nebu_tag.tag_id = tag.tag_id
        WHERE nebu.nebu_id = '${nebuId[0]}'
        GROUP BY nebu.nebu_id, users.email;
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
