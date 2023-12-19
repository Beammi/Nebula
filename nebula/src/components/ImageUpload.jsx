import React, { useCallback } from 'react';


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
    try {
      const files = e.target.files;

      // Process each file individually
      for (const file of files) {
        // Call onImagesUpload with the file
        const resizedFile = await resizeImage(file);
        onImagesUpload({ file: resizedFile, dataURL: resizedFile.dataURL }); // ส่ง dataURL ไปด้วย
      }
    } catch (error) {
      console.error('Error during image upload:', error);
    }
  }, [onImagesUpload]);

  return (
    <div className='text-center'>
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        style={{ display: 'none' }}
        id="imageInput"
        multiple
      />
      <label htmlFor="imageInput" className='cursor-pointer bg-grey hover:bg-black hover:text-white px-3 py-1 md:py-2 md:px-4 text-center text-2xl rounded-full ml-2'>
        +
      </label>
    </div>
  );
};

export default ImageUpload;
