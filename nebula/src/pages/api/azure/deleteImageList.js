// pages/api/azure/deleteImageList.js
import { BlobServiceClient } from "@azure/storage-blob";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { images } = req.body; // Expect an array of image URLs

  if (!images || !Array.isArray(images) || images.length === 0) {
    return res.status(400).json({ message: "A non-empty array of image URLs is required" });
  }

  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient("nebuimages");

    // Extract the blob name from each URL and delete it
    for (const imageUrl of images) {
      const blobName = imageUrl.split('/').pop();
      if (blobName) {
        const blobClient = containerClient.getBlobClient(blobName);
        await blobClient.deleteIfExists(); // Using deleteIfExists to avoid errors if blob doesn't exist
      }
    }

    res.status(200).json({ message: "Blobs deleted successfully" });
  } catch (error) {
    console.error("Error deleting blobs:", error);
    res.status(500).json({ message: "Failed to delete blobs", error: error.message });
  }
}
