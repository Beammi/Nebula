import db from "../../../lib/db"; // Ensure this path matches your project structure

async function editNebuHandler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Destructure and extract fields from the request body
  const {
    nebuId,
    title,
    description,
    duration,
    start_time,
    end_time,
    official_tag,
    tags, // Assuming 'tags' is an array of tag names
    open_sunday,
    open_monday,
    open_tuesday,
    open_wednesday,
    open_thursday,
    open_friday,
    open_saturday,
    open_time,
    close_time,
    website,
    phone_number
  } = req.body;

  try {
    // Start a transaction
    await db.query("BEGIN");

    // Update the Nebu information
    const updateNebuQuery = `
      UPDATE nebu
      SET
        title = $1,
        description = $2,
        duration = $3,
        start_time = $4,
        end_time = $5,
        official_tag = $6,
        open_sunday = $7,
        open_monday = $8,
        open_tuesday = $9,
        open_wednesday = $10,
        open_thursday = $11,
        open_friday = $12,
        open_saturday = $13,
        open_time = $14,
        close_time = $15,
        website = $16,
        phone_number = $17
      WHERE
        nebu_id = $18
      RETURNING *;
    `;
    const updateNebuResult = await db.query(updateNebuQuery, [
      title,
      description,
      duration,
      start_time,
      end_time,
      official_tag,
      open_sunday,
      open_monday,
      open_tuesday,
      open_wednesday,
      open_thursday,
      open_friday,
      open_saturday,
      open_time,
      close_time,
      website,
      phone_number,
      nebuId
    ]);

    if (updateNebuResult.rows.length === 0) {
      throw new Error("Nebu not found or unable to update");
    }

    // // First, clear existing tag associations for this Nebu
    // await db.query("DELETE FROM nebu_tag WHERE nebu_id = $1", [nebuId]);

    // // Then, re-insert the updated tag associations
    // for (const tagName of tags) {
    //   // Insert or update logic for tags as needed
    // }

    // Commit the transaction
    await db.query("COMMIT");

    res.status(200).json({ message: "Nebu updated successfully", nebu: updateNebuResult.rows[0] });
  } catch (error) {
    // Rollback the transaction in case of an error
    await db.query("ROLLBACK");
    console.error("Failed to update nebu:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default editNebuHandler;
