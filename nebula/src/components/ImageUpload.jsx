// ImageUpload.jsx
import React, { useCallback } from "react"

const ImageUpload = ({ onImagesUpload }) => {
  const resizeImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const dataURL = event.target.result;

        const img = new Image();
        img.src = dataURL;

        img.onload = () => {
          // Perform image resizing here if needed
          // For simplicity, we'll just resolve with the original file and dataURL
          resolve({ file, dataURL });
        };

        img.onerror = (error) => {
          reject(`Error loading image: ${error.message}`);
        };
      };

      reader.onerror = (error) => {
        reject(`Error reading file: ${error.message}`);
      };
    });
  };
  const handleInputChange = useCallback(async (e) => {
    const files = e.target.files;
    if (!files.length) return;
  
    for (const file of files) {
      // Validate each file
      if (!/\.(jpg|jpeg|png|gif)$/i.test(file.name)) {
        alert("Please select a valid image file (jpg, jpeg, png, gif).");
        continue; // Skip this file and continue with the next
      }
  
      try {
        const resizedFile = await resizeImage(file);
        // Assuming resizedFile contains { file, dataURL }
        onImagesUpload(resizedFile); // Correctly pass the resized file object
      } catch (error) {
        console.error("Error processing file:", error);
      }
    }
  }, [onImagesUpload]);
  

  return (
    <div className="text-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        style={{ display: "none" }}
        id="imageInput"
        multiple
      />
      <label
        htmlFor="imageInput"
        className="cursor-pointer bg-grey hover:bg-black hover:text-white px-3 py-1 md:py-2 md:px-4 text-center text-2xl rounded-full ml-2"
      >
        +
      </label>
    </div>
  )
}

export default ImageUpload
