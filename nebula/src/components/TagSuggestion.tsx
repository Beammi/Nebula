import Button from "./Button";
import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import TimeLimitBox from "./TimeLimitBox";
import Image from "next/image";
import closeIcon from "../../public/images/close.png";
import smallHashtag from "../../public/images/smallHashtag.png";
import NebuTag from "./NebuTag";

export default function TagSuggestion(props) {
  const tagSuggestionState = props.toggle;
  const action = props.action;

  const [uploadedImages, setUploadedImages] = useState([]);
  const [OpenTag, setOpenTag] = useState(false);

  function openTagModal(){
    setOpenTag(!OpenTag);
  }

  const handleImagesUpload = (uploadedImage) => {
    // Handle the uploaded image(s) as needed
    console.log("Uploaded Image:", uploadedImage);
    setUploadedImages((prevImages) => [...prevImages, uploadedImage]);
  };

  return (
    <div
      className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-all ease-in duration-500 ${
        tagSuggestionState
          ? "visible opacity-100 drop-shadow-2xl"
          : "rounded-sm invisible opacity-0"
      } `}
    >
      <div className="modal-box bg-white w-screen font-bold">
        <div className="flex justify-end mb-2">
          <button onClick={action}>
            <Image
              src={closeIcon}
              alt="clsbtn"
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


          
        </form>
      </div>
    </div>
  );
}
