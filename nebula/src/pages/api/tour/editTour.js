import db from "../../../lib/db"; // Ensure this path matches your project structure

async function editNebuHandler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Destructure and extract fields from the request body
  const {
    tourId,
    tourName,
    description
  } = req.body;

  try {
    // Start a transaction
    await db.query("BEGIN");

    // Update the Nebu information
    const updateNebuQuery = `
      UPDATE tour
      SET
        tour_name = $2,
        description = $3
      WHERE
        tour_id = $1
      RETURNING *;
    `;
    const updateNebuResult = await db.query(updateNebuQuery, [
      tourId,
      tourName,
      description,      
    ]);

    if (updateNebuResult.rows.length === 0) {
      throw new Error("Tour not found or unable to update");
    }

    // // First, clear existing tag associations for this Nebu
    // await db.query("DELETE FROM nebu_tag WHERE nebu_id = $1", [nebuId]);

    // // Then, re-insert the updated tag associations
    // for (const tagName of tags) {
    //   // Insert or update logic for tags as needed
    // }

    // Commit the transaction
    await db.query("COMMIT");

    res.status(200).json({ message: "Tour updated successfully", nebu: updateNebuResult.rows[0] });
  } catch (error) {
    // Rollback the transaction in case of an error
    await db.query("ROLLBACK");
    console.error("Failed to update Tour:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default editNebuHandler;
