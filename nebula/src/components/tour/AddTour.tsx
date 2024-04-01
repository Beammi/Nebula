//AddTour.tsx
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

  const {
    tourData,
    addPlace,
    setOfficialTag,
    toggleOpenTagModal,
    addAdditionalTag,
    updateTags,
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
    const tourDataToSend = {
      tour_name: tourData.tourName,
      description: tourData.description,
      official_tag: tourData.officialTag,
      // Directly use latitude and longitude without extracting from a location array
      places: tourData.routePlaces.map(({ name, latitude, longitude }) => ({
        place_name: name,
        latitude, // Directly using latitude
        longitude, // Directly using longitude
      })),
      waypoints: tourData.waypoints.map(({ name, latitude, longitude }) => ({
        waypoint_name: name,
        latitude, // Directly using latitude
        longitude, // Directly using longitude
      })),
      tags: tourData.additionalTags, // Assuming this is an array of string tags
      images: [], // Populate this according to your application's requirements
      user_email: email  // Use the actual user email
    };
  
    try {
      const response = await fetch("/api/tour/addTour", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tourDataToSend),
      });
  
      if (response.ok) {
        // Handle successful response
        console.log("Tour added successfully");
        alert("Tour Form add successful")
        // Possibly redirect the user or show a success message
      } else {
        // Handle errors or unsuccessful response
        console.error("Failed to add tour");
      }
    } catch (error) {
      console.error("Error submitting tour:", error);
    }
  };
  
  useEffect(() => {
    const savedTourName = localStorage.getItem("tourName")
    const savedDescription = localStorage.getItem("description")
    const savedTags = JSON.parse(
      localStorage.getItem("confirmedAdditionalTags")
    )
    const storedPlaceText = localStorage.getItem("text")

    if (savedTourName) setTourName(savedTourName)
    if (savedDescription) setDescription(savedDescription)
    if (savedTags) setConfirmedAdditionalTags(savedTags)
    if (storedPlaceText) setRoutePlaces([storedPlaceText])
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

  useEffect(()=>{
    getEmail()
  },[])

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
                  event.preventDefault()
                  openTagModal()
                }}
              ></Button>
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="text-lg">Place</h3>
            {tourData.routePlaces.map((place, index) => (
              <div key={index} className="w-fit text-black">
                <h3 className="bg-white text-black">- {place.name}</h3>
              </div>
            ))}
            <h3 className="text-lg">Waypoint</h3>
            {tourData.waypoints.map((place, index) => (
              <div key={index} className="w-fit text-black">
                <h3 className="bg-white text-black">- {place.name}</h3>
              </div>
            ))}
            <div className="flex flex-row items-center">
              {/* <Button
                type="button"
                buttonStyle="p-2 mt-2 bg-blue text-white rounded-lg"
                label="Add place"
              ></Button> */}
              <Button
                buttonStyle="btn text-black border-none cursor-pointer bg-grey hover:bg-black hover:text-white md:py-2 md:px-4 text-center text-2xl rounded-full ml-2"
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
          <button className="btn btn-primary p-2" onClick={(e) => {
                  handleSubmit(e) // Use prepareSubmit instead
                  // Correctly invoke the function

                  action() // Assuming this is correctly invoking another function
                } }>Confirm</button>
        </div>
      </div>
    </>
  )
}
