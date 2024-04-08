//AddTour.tsx
// @ts-nocheck
import Button from "../Button"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import close from "../../../public/images/close.png"
import NebuTag from "../NebuTag"
import Officialdropdown from "../Officialdropdown"
import AddPlaceModal from "./AddPlaceModal"
import MoveablePin from "@/components/map/MoveablePin"
import { useTour } from "@/contexts/TourContext" // Adjust the import path as needed
import { TourContextType } from "../../types/tourContext"
import { supabase } from "@/lib/supabaseClient"
import ImageUpload from "@/components/ImageUpload"
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal"
import { Place } from "../../types/tourContext" // Adjust import path as necessary

export default function AddTour({ toggle, action, placeText }) {
  // console.log("Text prop value:", placeText)
  const [confirmedAdditionalTags, setConfirmedAdditionalTags] = useState([])
  const [selected, setSelected] = useState("Official's Tag")
  const [OpenTag, setOpenTag] = useState(false)
  const [AddPlace, setAddPlace] = useState(false)
  const [tourName, setTourName] = useState("")
  const [description, setDescription] = useState("")
  const [routePlaces, setRoutePlaces] = useState([]) // Array to store route places
  const [email, setEmail] = useState("")
  const [provider, setProvider] = useState("")
  const [uploadedImagesTour, setUploadedImagesTour] = useState([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [itemToDelete, setItemToDelete] = useState<{
    type: 'place' | 'waypoint' | 'tag';
    id: number; // For places and waypoints
    name: string; // For tags, name will be the tag text
  }>({ type: 'place', id: -1, name: '' });
  

  const handleDeleteClick = (
    type: 'place' | 'waypoint' | 'tag',
    id: number,
    name: string
  ): void => {
    setItemToDelete({ type, id, name });
    setModalOpen(true);
  };
  

  const confirmDelete = (): void => {
    switch (itemToDelete.type) {
      case 'place':
        removePlace(itemToDelete.id);
        break;
      case 'waypoint':
        removeWaypoint(itemToDelete.id);
        break;
      case 'tag':
        removeTag(itemToDelete.name);
        break;
      default:
        console.warn('Unknown item type for deletion');
    }
    setModalOpen(false);
  };
  
  const handleDeleteTagClick = (tagName) => {
    // Assuming you already have logic to show a confirmation modal
    // Once deletion is confirmed in the modal:
    removeTag(tagName);
    setModalOpen(false)
  };
  const {
    tourData,
    addPlace,
    setOfficialTag,
    toggleOpenTagModal,
    addAdditionalTag,
    updateTags,
    removePlace,
    removeWaypoint,
    removeTag,
  } = useTour() as TourContextType
  async function getEmail() {
    console.log("Pass getEmail()")

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    // console.log(JSON.stringify(user))

    if (error || user === null) {
      console.log("Error in getUser")
      return
    }
    if (user.app_metadata.provider == "email") {
      console.log("Session: " + JSON.stringify(user.app_metadata.provider))
      // console.log("emailllll: " + user.email)

      setEmail(user.email)
      setProvider("email")
      console.log("Email in email: ", email)
      console.log("Provider: ", user.app_metadata.provider)
    } else {
      setEmail(user.user_metadata.email)
      setProvider(user.app_metadata.provider || "")
      console.log("Email Provider: ", email)
      console.log("Provider : ", provider)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (email === "") {
      alert("Please refresh")
    }
    // Check for required fields or any other validation you have
    if (tourName === "" || tourData.officialTag === "Official's Tag") {
      alert(
        "Please name the nebu title before submitting or select an official's tag."
      )
      return // Stop execution if validation fails
    }
    // Upload images first if there are any

    const tourDataToSend = {
      tour_name: tourName,
      description: description,
      official_tag: tourData.officialTag,
      // Directly use latitude and longitude without extracting from a location array
      places: tourData.routePlaces.map(({ name, latitude, longitude }) => ({
        name,
        latitude, // Directly using latitude
        longitude, // Directly using longitude
      })),
      waypoints: tourData.waypoints.map(({ name, latitude, longitude }) => ({
        name,
        latitude, // Directly using latitude
        longitude, // Directly using longitude
      })),
      tags: tourData.additionalTags, // Assuming this is an array of string tags
      user_email: email, // Use the actual user email
    }

    try {
      const response = await fetch("/api/tour/addTour", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tourDataToSend),
      })

      if (response.ok) {
        // Handle successful response
        console.log("Tour added successfully")
        alert("Tour Form add successful")
        // Possibly redirect the user or show a success message
      } else {
        // Handle errors or unsuccessful response
        console.error("Failed to add tour")
      }
    } catch (error) {
      console.error("Error submitting tour:", error)
    }
  }
  function getImageSize(numImages) {
    const maxImagesPerRow = 8
    const maxImageSize = 100

    const imageSize = Math.min(
      maxImageSize,
      100 / Math.min(numImages, maxImagesPerRow)
    )
    return `w-${imageSize}px h-${imageSize}px`
  }
  useEffect(() => {
    const savedTourName = localStorage.getItem("tourName")
    const savedDescription = localStorage.getItem("description")
    const savedTags = JSON.parse(
      localStorage.getItem("confirmedAdditionalTags")
    )
    // const storedPlaceText = localStorage.getItem("text")

    if (savedTourName) setTourName(savedTourName)
    if (savedDescription) setDescription(savedDescription)
    if (savedTags) setConfirmedAdditionalTags(savedTags)
    // if (storedPlaceText) setRoutePlaces([storedPlaceText])
  }, [])

  useEffect(() => {
    localStorage.setItem("tourName", tourName)
  }, [tourName])

  useEffect(() => {
    localStorage.setItem("description", description)
  }, [description])

  useEffect(() => {
    localStorage.setItem(
      "confirmedAdditionalTags",
      JSON.stringify(confirmedAdditionalTags)
    )
  }, [confirmedAdditionalTags])

  useEffect(() => {
    getEmail()
  }, [email])

  const handleTagConfirm = (officialTag, additionalTag) => {
    if (additionalTag.length > 0) {
      setConfirmedAdditionalTags((prevTags) => [...prevTags, ...additionalTag])

      additionalTag.forEach((tag) => addAdditionalTag(tag))
    }

    // setOfficialTag(officialTag)
    // updateTags(officialTag, tourData.additionalTags);

    toggleOpenTagModal()
    setOpenTag(false)
  }

  function truncatePlace(place) {
    let commaCount = 0
    let index = 0
    for (let i = 0; i < place.length; i++) {
      if (place[i] === ",") {
        commaCount++
        if (commaCount === 3) {
          index = i
          break
        }
      }
    }
    return place.slice(0, index)
  }

  function openTagModal() {
    setOpenTag(!OpenTag)
  }

  function openAddPlaceModal() {
    setAddPlace(!AddPlace)
  }

  return (
    <>
      <div
        className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-all ease-in duration-500 ${
          toggle
            ? "visible opacity-100 drop-shadow-2xl"
            : "rounded-sm invisible opacity-0"
        } `}
      >
        <div className=" bg-white font-bold modal-box w-screen text-black">
          <div className="flex justify-end mb-2">
            <button onClick={action}>
              <Image src={close} alt="clsbtn" className="pt-2" width={20} />
            </button>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg">Tour name</h3>
            <input
              type="text"
              value={tourName} // bind input value to state variable
              onChange={(e) => setTourName(e.target.value)} // update state variable on change
              className="p-2 bg-grey rounded-md focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue"
            />
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="text-lg">Description</h3>
            <textarea
              name="postContent"
              rows={5}
              cols={40}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 resize-none bg-grey rounded-md focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue"
            />
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="text-lg">Tags</h3>
            <div className="flex items-center ">
              <div>
                <Officialdropdown
                  selected={tourData.officialTag}
                  setSelected={setOfficialTag}
                />
              </div>
              <div className="pt-4 flex ml-2 overflow-x-auto">
                {tourData.additionalTags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-blue p-2 rounded-lg text-white mr-2 w-max h-fit cursor-pointer"
                    onClick={() => handleDeleteClick("tag",-1,tag)}>
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
                  event.preventDefault()
                  openTagModal()
                }}
              ></Button>
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="text-lg mt-8">Place</h3>
            {tourData.routePlaces.map((place, index) => (
              <div
                key={place.id}
                className="w-fit text-black mb-1 cursor-pointer"
                onClick={() => handleDeleteClick("place", place.id, place.name)}
              >
                <h3 className="bg-white text-black">
                  - {truncatePlace(place.name)}
                </h3>
              </div>
            ))}
            {tourData.waypoints.length > 0 && (
              <h3 className="text-lg mt-4">Waypoint</h3>
            )}
            {tourData.waypoints.map((place, index) => (
              <div
                key={place.id}
                className="w-fit text-black mb-1 cursor-pointer"
                onClick={() =>
                  handleDeleteClick("waypoint", place.id, place.name)
                }
              >
                <h3 className="bg-white text-black">
                  - {truncatePlace(place.name)}
                </h3>
              </div>
            ))}
            <DeleteConfirmationModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              onConfirm={confirmDelete}
              itemName={itemToDelete.name}
            />
            <div className="flex flex-row items-center">
              {/* <Button
                type="button"
                buttonStyle="p-2 mt-2 bg-blue text-white rounded-lg"
                label="Add place"
              ></Button> */}
              <Button
                buttonStyle="btn text-black border-none cursor-pointer bg-grey hover:bg-black hover:text-white md:py-2 md:px-4 text-center text-2xl rounded-full ml-2 mb-6"
                label="+"
                type="button"
                onClick={(event) => {
                  event.preventDefault()
                  openAddPlaceModal()
                }}
              ></Button>
              <AddPlaceModal
                toggle={AddPlace}
                action={() => setAddPlace(false)}
              />
            </div>
          </div>
          <button
            className="btn btn-primary p-2"
            onClick={(e) => {
              handleSubmit(e) // Use prepareSubmit instead
              // Correctly invoke the function

              action() // Assuming this is correctly invoking another function
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  )
}
