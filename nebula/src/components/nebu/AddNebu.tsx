import Button from "@/components/Button";
import React, { useState, useEffect } from "react";
import ImageUpload from "@/components/ImageUpload";
import TimeLimitBox from "@/components/TimeLimitBox";
import Image from "next/image";
import close from "../../../public/images/close.png";
import NebuTag from "@/components/NebuTag";
import Officialdropdown from "@/components/Officialdropdown";
import { getCurrentLocation, getPlaceName } from "@/utils/navigationUtils";
import { useLocation } from "@/contexts/LocationContext";
import { supabase } from "@/lib/supabaseClient";

export default function AddNebu(props) {
  const addNebuState = props.toggle;
  const action = props.action;

  const [uploadedImages, setUploadedImages] = useState([]);
  const [OpenTag, setOpenTag] = useState(false);
  const [confirmedAdditionalTags, setConfirmedAdditionalTags] = useState([]);
  const [officialTag, setofficialTag] = useState("Official's Tag");
  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageNebu, setImageNebu] = useState("");
  const [workHour, setWorkHour] = useState(false);
  const [openTime, setOpenTime] = useState(null);
  const [closeTime, setCloseTime] = useState(null);
  const [timeLimitType, setTimeLimitType] = useState("permanent");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [email, setEmail] = useState("");
  const [provider, setProvider] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const { currentPosition, setCurrentPosition, currentPlace, setCurrentPlace } =
    useLocation();

  if (currentPosition === null) {
    const defaultLocation = [13.7563, 100.5018];
    setCurrentPosition(defaultLocation);
  }
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

  const isValidImageExtension = (fileName) => {
    return /\.(jpg|jpeg|png|gif)$/i.test(fileName);
  };

  const handleImagesUpload = ({ file, dataURL }) => {
    // Now, file should correctly be a File object, and dataURL should be its data URL
    if (!isValidImageExtension(file.name)) {
      alert("Unsupported file type.");
      return;
    }
    setUploadedImages((prevImages) => [...prevImages, { dataURL, file }]);
    console.log(uploadedImages);
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

  function handleWorkHourCheckBox() {
    let checkbox = document.getElementById("workHourCB") as HTMLInputElement;
    if (checkbox && checkbox.checked) {
      setWorkHour(true);
    }
  }
  const getOpenDays = () => {
    return Object.entries(isChecked)
      .filter(([day, checked]) => checked)
      .map(([day]) => day);
  };

  async function getEmail() {
    console.log("Pass getEmail()");

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    // console.log(JSON.stringify(user))

    if (error || user === null) {
      console.log("Error in getUser");
      return;
    }
    if (user.app_metadata.provider == "email") {
      console.log("Session: " + JSON.stringify(user.app_metadata.provider));
      // console.log("emailllll: " + user.email)

      setEmail(user.email);
      setProvider("email");
      console.log("Email in email: ", email);
      console.log("Provider: ", user.app_metadata.provider);
    } else {
      setEmail(user.user_metadata.email);
      setProvider(user.app_metadata.provider || "");
      console.log("Email Provider: ", email);
      console.log("Provider : ", provider);
    }
  }

  const handleSummit = async (
    e?: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    console.log("handleSummit is called"); // Debugging line

    e?.preventDefault();

    // Initialize an array to hold the URLs of the uploaded images
    let imageUrls = [];

    // Check for required fields or any other validation you have
    if (title === "" || officialTag === "Official's Tag") {
      alert(
        "Please name the nebu title before submitting or select an official's tag."
      );
      return; // Stop execution if validation fails
    }

    // Upload images first if there are any
    if (uploadedImages.length > 0) {
      const uploadPromises = uploadedImages.map(async (image) => {
        const formData = new FormData();
        formData.append("image", image.file); //'image' is the expected field on the server

        try {
          const response = await fetch("/api/azure/uploadImages", {
            method: "POST",
            body: formData,
            // Include headers for authentication if necessary
          });

          if (!response.ok) {
            throw new Error(`Failed to upload image: ${response.statusText}`);
          }

          const result = await response.json();
          return result.imageUrl; // Adjust based on your actual API response
        } catch (error) {
          console.error("Error uploading image:", error);
          throw error; // Rethrow to handle outside
        }
      });

      try {
        imageUrls = await Promise.all(uploadPromises);
      } catch (error) {
        alert("Failed to upload one or more images. Please try again.");
        return; // Stop the submission if image uploads fail
      }
    }
    const imagesArray = Array.isArray(imageUrls) ? imageUrls : [];
    console.log(imagesArray);
    // Proceed to submit form data along with image URLs
    try {
      const {
        Mon: open_monday,
        Tue: open_tuesday,
        Wed: open_wednesday,
        Thu: open_thursday,
        Fri: open_friday,
        Sat: open_saturday,
        Sun: open_sunday,
      } = isChecked;
      const response = await fetch("/api/nebu/addNebu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          images: imageUrls, // Make sure the key matches the server's expected key
          duration: timeLimitType,
          official_tag: officialTag,
          tags: confirmedAdditionalTags,
          latitude: currentPosition[0],
          longitude: currentPosition[1],
          place_name: currentPlace,
          open_sunday,
          open_monday,
          open_tuesday,
          open_wednesday,
          open_thursday,
          open_friday,
          open_saturday,
          start_time: startDate,
          end_time: endDate,
          open_time: openTime,
          close_time: closeTime,
          provider: provider,
          email: email,
          phone_number: phoneNumber,
          website,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit form: ${response.statusText}`);
      }

      // Handle successful form submission
      alert("Form submitted successfully!");
      // Perform any additional actions like redirecting or clearing the form
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again.");
    }
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
    getEmail();
    console.log("Check email" + email);
    console.log("Updated email: ", email);

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
  }, [email]); // Empty dependency array ensures the effect runs only once

  function getImageSize(numImages) {
    const maxImagesPerRow = 8;
    const maxImageSize = 100;

    const imageSize = Math.min(
      maxImageSize,
      100 / Math.min(numImages, maxImagesPerRow)
    );
    return `w-${imageSize}px h-${imageSize}px`;
  }

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
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-4">
                <h3 className="text-lg">Description</h3>
                <textarea
                  name="postContent"
                  rows={5}
                  cols={40}
                  className="p-2 resize-none bg-grey rounded-md focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <div className="flex flex-col">
                  <h3 className="text-lg">Website</h3>
                  <input
                    type="text"
                    className=" bg-grey rounded-md focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue"
                    id="website"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <h3 className="text-lg">Phone</h3>
                  <input
                    type="text"
                    className=" bg-grey rounded-md focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col mt-4">
                <h3 className="text-lg">Tags</h3>
                <div className="flex items-center ">
                  <div>
                    <Officialdropdown
                      selected={officialTag}
                      setSelected={setofficialTag}
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
                    <div className="flex gap-2 overflow-auto">
                      {uploadedImages.map((image, index) => (
                        <div
                          key={index}
                          className={`image-container ${getImageSize(
                            uploadedImages.length
                          )}`}
                        >
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
                <TimeLimitBox
                  timeLimitType={timeLimitType}
                  setTimeLimitType={setTimeLimitType}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                />
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
                    value={openTime}
                    onChange={(e) => setOpenTime(e.target.value)}
                    className="mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue bg-black-grey"
                  />
                </div>
                <span className="mt-4 mb-2">Close Time:</span>
                <div className="flex items-center justify-center">
                  <input
                    type="time"
                    id="closeTime"
                    name="closeTime"
                    value={closeTime}
                    onChange={(e) => setCloseTime(e.target.value)}
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
                  <input
                    type="checkbox"
                    id="workHourCB"
                    className=" mr-2"
                    onClick={handleWorkHourCheckBox}
                  />
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
                onClick={() => {
                  handleSummit(); // Correctly invoke the function

                  action(); // Assuming this is correctly invoking another function
                }}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
