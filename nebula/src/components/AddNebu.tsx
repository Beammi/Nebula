import Button from "./Button";
import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import TimeLimitBox from "./TimeLimitBox";
import Image from "next/image";
import close from "../../public/images/close.png";

export default function AddNebu(props) {
  const addNebuState = props.toggle;
  const action = props.action;

  const [uploadedImages, setUploadedImages] = useState([]);

  const handleImagesUpload = (uploadedImage) => {
    // Handle the uploaded image(s) as needed
    console.log("Uploaded Image:", uploadedImage);
    setUploadedImages((prevImages) => [...prevImages, uploadedImage]);
  };

  return (
    <div
      className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-all ease-in duration-500 ${
        addNebuState
          ? "visible opacity-100 drop-shadow-2xl"
          : "rounded-sm invisible opacity-0"
      } `}
    >
      <div className="modal-box bg-white w-screen font-bold">
        <div className="flex justify-end mb-2">
          <button onClick={action}>
            <Image
              src={close}
              alt="adventure pic"
              className="pt-2"
              width={20}
            />
          </button>
        </div>
        <form action="" className="text-black">
          <div className="flex flex-col">
            <h3 className="text-lg">Title</h3>
            <input
              type="text"
              className="p-2 bg-grey rounded-md focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue"
            />
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="text-lg">Description</h3>
            <textarea
              name="postContent"
              rows={5}
              cols={40}
              className="p-2 resize-none bg-grey rounded-md focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue"
            />
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="text-lg">Tags</h3>
            <Button
              buttonStyle="btn btn-primary bg-yellow w-fit border-none"
              label="#official"
            ></Button>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="text-lg mb-4">Image</h3>
            <div className="flex flex-row-reverse justify-end items-center">
              <ImageUpload onImagesUpload={handleImagesUpload} />
              {uploadedImages.length > 0 && (
                <div className="flex gap-2">
                  {uploadedImages.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image.dataURL}
                        alt={`Uploaded ${index + 1}`}
                        className="w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex mt-4">
            <TimeLimitBox />
          </div>
          <div className="w-full text-center mt-4">
            <Button buttonStyle="btn btn-primary bg-blue w-fit border-none" label="NEXT" />
          </div>
        </form>
      </div>
    </div>
  );
}
