// pages/api/azure/uploadImages.js
import { BlobServiceClient } from "@azure/storage-blob"
import { IncomingForm } from "formidable"
import { promises as fs } from "fs"

export const config = {
  api: {
    bodyParser: false, // Disable the default bodyParser to use formidable for file parsing
  },
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" })
    return
  }

  // Parse the multipart/form-data request
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm()
    form.parse(req, async (err, fields, files) => {
      console.log(files) // Add this line
      if (err) reject(err)
      resolve(files)
    })
  })

  // Assuming the file input field is named 'image'
  const file = data.image[0] // Access the first file in the array
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING
  )
  const containerClient = blobServiceClient.getContainerClient("nebuimages")
  const blobName = `${Date.now()}-${file.originalFilename}` // Ensure the file name is unique
  const blockBlobClient = containerClient.getBlockBlobClient(blobName)

  try {
    // Read the file content from the temporary file path
    const fileContent = await fs.readFile(file.filepath);

    // Specify the Content-Type for the blob
    const blobHttpHeaders = {
      blobContentType: file.mimetype, // This sets the MIME type of the image
    };

    // Upload file to Azure Blob Storage, setting the Content-Type
    await blockBlobClient.upload(fileContent, fileContent.length, {
      blobHTTPHeaders: blobHttpHeaders,
    });

    // Generate URL for the uploaded image
    const imageUrl = blockBlobClient.url;

    // Here you can store imageUrl to your database

    // Send back the URL to the client
    res.status(200).json({ imageUrl });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "File upload failed", error: error.message });
}

}
