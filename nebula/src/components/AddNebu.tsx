import Button from "./Button";
import React, { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import TimeLimitBox from "./TimeLimitBox";
import Image from "next/image";
import close from "../../public/images/close.png";
import NebuTag from "./NebuTag";
import Officialdropdown from "./Officialdropdown";

export default function AddNebu(props) {
  const addNebuState = props.toggle;
  const action = props.action;

  const [uploadedImages, setUploadedImages] = useState([]);
  const [OpenTag, setOpenTag] = useState(false);
  const [confirmedAdditionalTags, setConfirmedAdditionalTags] = useState([]);
  const [selected, setSelected] = useState("Official's Tag");
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;
  const [isChecked, setIsChecked] = useState({
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
    Sun: false,
  }); // State to track checkbox status

  function openTagModal() {
    setOpenTag(!OpenTag);
  }

  const handleImagesUpload = (uploadedImage) => {
    // Handle the uploaded image(s) as needed
    console.log("Uploaded Image:", uploadedImage);
    setUploadedImages((prevImages) => [...prevImages, uploadedImage]);
  };

  const handleTagConfirm = (officialTag, additionalTag) => {
    if (additionalTag.length > 0) {
      setConfirmedAdditionalTags((prevTags) => [...prevTags, ...additionalTag]);
    }

    setOpenTag(false);
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSummit = () => {
    console.log("Form submitted");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target; // Update state when checkbox status changes

    setIsChecked((prevState) => ({
      ...prevState,
      [id]: checked,
    }));

    // Send isChecked value to the server
    // You can use isChecked to send the correct boolean value to the server
    console.log("Checkbox is checked:", id, checked);
    // Here you can make an API call to send the isChecked value to the server
  };

  // Append the style element to the document head
  useEffect(() => {
    const additionalStyles = `
    .content input[type="checkbox"] {
      display: none;
    }
    .content input[type="checkbox"] + label {
      display: inline-block;
      background-color: #ccc;
      cursor: pointer;
      padding: 5px 10px;
      margin: 5px;
      border-radius: 10px;
    }
    .content input[type="checkbox"]:checked + label {
      background-color: #544CE6;
      color: #ffffff;
    }
  `;

    // Create a style element
    const styleElement = document.createElement("style");

    // Set the inner HTML of the style element to your CSS styles
    styleElement.innerHTML = additionalStyles;

    document.head.appendChild(styleElement);

    // Clean up function to remove the style element when component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []); // Empty dependency array ensures the effect runs only once

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
            <Image src={close} alt="clsbtn" className="pt-2" width={20} />
          </button>
        </div>
        <form action="" className="text-black">
          {currentStep === 1 && (
            <>
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
                <div className="flex items-center ">
                  <div>
                    <Officialdropdown
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </div>
                  <div className="pt-4 flex ml-2 overflow-x-auto">
                    {confirmedAdditionalTags.map((tag, index) => (
                      <div
                        key={index}
                        className="bg-blue p-2 rounded-lg text-white mr-2 w-max h-fit"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                  <NebuTag
                    toggle={OpenTag}
                    action={() => setOpenTag(false)}
                    onConfirm={handleTagConfirm}
                  />
                  <Button
                    buttonStyle="btn text-black border-none cursor-pointer bg-grey hover:bg-black hover:text-white md:py-2 md:px-4 text-center text-2xl rounded-full ml-2"
                    label="+"
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      openTagModal();
                    }}
                  ></Button>
                </div>
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
            </>
          )}
          {currentStep === 2 && (
            <>
              <div className="flex flex-col">
                <span className="mb-2">Open Time:</span>
                <div className="flex items-center justify-center">
                  <input
                    type="time"
                    id="openTime"
                    name="openTime"
                    className="mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue bg-black-grey"
                  />
                </div>
                <span className="mt-4 mb-2">Close Time:</span>
                <div className="flex items-center justify-center">
                  <input
                    type="time"
                    id="closeTime"
                    name="closeTime"
                    className="mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue bg-black-grey"
                  />
                </div>
                <div className="flex flex-col mt-4 justify-center md:flex-row md:justify-start">
                  <div className="content">
                    <span>Open days</span>
                    <div className="mt-4">
                      {/* Render checkboxes for each day */}
                      {Object.keys(isChecked).map((day) => (
                        <React.Fragment key={day}>
                          <input
                            type="checkbox"
                            id={day}
                            checked={isChecked[day]}
                            onChange={handleChange}
                          />
                          <label htmlFor={day}>{day}</label>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col mt-4">
                  <h3 className="text-lg">Additional Information</h3>
                  <textarea
                    name="postContent"
                    rows={5}
                    cols={40}
                    className="p-2 resize-none bg-grey rounded-md focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue"
                  />
                </div>
                <div className="mt-4">
                  <input type="checkbox" className=" mr-2" />
                  <span>Not include working hours</span>
                </div>
              </div>
            </>
          )}
          <div className="w-full text-center mt-4 flex justify-between items-center">
            {currentStep < totalSteps && (
              <div className="flex justify-center items-center w-full">
                <Button
                  buttonStyle="btn btn-primary bg-blue w-fit border-none"
                  label="NEXT"
                  type="button"
                  onClick={handleNext}
                />
              </div>
            )}
            {currentStep > 1 && (
              <Button
                buttonStyle="btn btn-primary bg-blue w-fit border-none"
                label="Back"
                type="button"
                onClick={handlePrevious}
              />
            )}
            {currentStep === totalSteps && (
              <Button
                buttonStyle="btn btn-primary bg-blue w-fit border-none"
                label="Complete"
                type="button"
                onClick={handleSummit}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
