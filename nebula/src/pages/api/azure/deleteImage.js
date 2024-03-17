// pages/api/azure/deleteImage.js
import { BlobServiceClient } from "@azure/storage-blob";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { blobName } = req.body; // Assume the client sends the name of the blob to delete

  if (!blobName) {
    return res.status(400).json({ message: "Blob name is required" });
  }

  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient("nebuimages");

    const blobClient = containerClient.getBlobClient(blobName);
    await blobClient.delete();

    res.status(200).json({ message: `Blob ${blobName} deleted successfully` });
  } catch (error) {
    console.error("Error deleting blob:", error);
    res.status(500).json({ message: "Failed to delete blob", error: error.message });
  }
}
