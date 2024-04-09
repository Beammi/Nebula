
import Button from "./Button"
import React, { useState, useEffect } from "react"
import ImageUpload from "./ImageUpload"
import TimeLimitBox from "./TimeLimitBox"
import Image from "next/image"
import closeIcon from "../../public/images/close.png"
import smallHashtag from "../../public/images/smallHashtag_blue.png"
import filterIcon from "../../public/images/filter-icon.png"
import skyPic from "../../public/images/skyPic.png"
import profilePic from "../../public/images/lionelPic.png"
import holmesPic from "../../public/images/holmesPic.png"
import ferryWheelPic from "../../public/images/ferryWheelPic.png"
import altImage from "../../public/images/altImage.png"
// import closeIcon from "../../public/images/close.png"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"
import NebuTag from "@/components/NebuTag"
import Officialdropdown from "@/components/Officialdropdown"
import AddPlaceModal from "@/components/tour/AddPlaceModal"
import placePinIcon from "../../public/images/placePinIcon.png"
import { useTour } from "@/contexts/TourContext"
import { TourContextType } from "../types/tourContext"
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal"
import closeImage from "../../public/images/close.png"
import { useRouter } from "next/router"

export default function MyTour(props) {
  const mockData = [
    {
      title: "'A Must' London Show",
      description:
        "A must destination in UK. Coming in daytime makes your picture much better while the image at night also looks exceptional. This is worth it, there are many attractions near this place. You should come before you die. I recommend it!!",
      place: ["Big Ben", "Tower Bridge", "London Eye", "Wembley Stadium"],
    },
    {
      title: "Flower Garden Tour",
      description:
        "A must destination in UK. Coming in daytime makes your picture much better while the image at night also looks exceptional. This is worth it, there are many attractions near this place. You should come before you die. I recommend it!!",
      place: ["Big Ben", "Tower Bridge", "London Eye", "Wembley Stadium"],
    },
    {
      title: "Street Musician Tour",
      description:
        "A must destination in UK. Coming in daytime makes your picture much better while the image at night also looks exceptional. This is worth it, there are many attractions near this place. You should come before you die. I recommend it!!",
      place: ["Big Ben", "Tower Bridge", "London Eye", "Wembley Stadium"],
    },
  ]
  const state = props.toggle
  const action = props.action
  const accountName = props.accountName
  const [showInfo, setShowInfo] = useState([false])
  const [showAllSelectBox, setShowAllSelectBox] = useState(false)
  const [data, setData] = useState([])
  const [checkedStatus, setCheckedStatus] = useState({}) // Initialize object to store checked status of each tour

  const [showDeletePopUp, setShowDeletePopUp] = useState(false)
  const [email, setEmail] = useState("")
  const [provider, setProvider] = useState("")
  const [showEditTour, setShowEditTour] = useState(false)
  const router = useRouter()

  const [confirmedAdditionalTags, setConfirmedAdditionalTags] = useState([])
  const [selected, setSelected] = useState("Official's Tag")
  const [OpenTag, setOpenTag] = useState(false)
  const [AddPlace, setAddPlace] = useState(false)
  const [tourId, setTourId] = useState(0)
  const [tourName, setTourName] = useState("")
  const [description, setDescription] = useState("")
  const [places, setPlaces] = useState([])
  const [waypoints, setWaypoints] = useState([])
  const [routePlaces, setRoutePlaces] = useState([]) // Array to store route places

  const [uploadedImagesTour, setUploadedImagesTour] = useState([])
  const [images, setImages] = useState([])
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
      // case 'tag':
      //   removeTag(itemToDelete.name);
      //   break;
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
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || user === null) {
      console.log("Error in getUser")
      return
    }
    const userEmail =
      user.app_metadata.provider === "email"
        ? user.email
        : user.user_metadata.email
    const userProvider = user.app_metadata.provider || ""
    setEmail(userEmail)
    setProvider(userProvider)
    fetchData(userEmail, userProvider)
  }

  const fetchData = async (email, provider) => {
    const url = `/api/tour/getTourFromUser?email=${encodeURIComponent(
      email
    )}&provider=${encodeURIComponent(provider)}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      setData(data)
      setCheckedStatus({}) // Clear checked status
    } catch (error) {
      console.error("Fetch error:", error)
    }
  }

  function handleCheckboxClick(tourId) {
    setCheckedStatus((prevStatus) => ({
      ...prevStatus,
      [tourId]: !prevStatus[tourId], // Toggle the checked status for the clicked tourId
    }))
  }

  async function deleteSelectedTours() {
    const selectedTourIds = Object.keys(checkedStatus).filter(
      (tourId) => checkedStatus[tourId]
    )

    try {
      const response = await fetch("/api/tour/deleteTour", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tour_ids: selectedTourIds }),
      })

      if (!response.ok) throw new Error("Failed to delete Nebu posts")

      // Handle successful deletion
      // For example, refetching the posts or updating the UI accordingly
      console.log("Deleted successfully")
      setShowDeletePopUp(false)
      setShowAllSelectBox(false)
      fetchData(email, provider)
    } catch (error) {
      console.error("Error deleting Tour posts:", error)
    }
  }

  function formatPlaces(placesArray) {
      const formattedPlaces = placesArray.map(place => place.split(',')[0]); // Get the first part of each place until the first comma
      return formattedPlaces.join(', '); // Join the places with commas
  }

  useEffect(() => {
    getEmail()
  }, [])

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

  function openTagModal() {
    setOpenTag(!OpenTag)
  }

  function openAddPlaceModal() {
    setAddPlace(!AddPlace)
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

  // useEffect(() => {
  //   async function getTour(){
  //     if(showEditTour){
  //       const response = await fetch(`/api/tour/getTourById?tour_id=${}`)
  //       const data = await response.json()
        
  //     }
  //   }

  //   getTour
  // }, [showEditTour])

  async function handleEdit(tour_id){
    setShowEditTour(true)

    const response = await fetch(`/api/tour/getTourById?tour_id=${tour_id}`)
    const data = await response.json()
    
    setTourId(tour_id)
    setTourName(data.tour_name)
    setDescription(data.description)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/tour/editTour", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tourId,
          tourName,
          description        
        }),
      })

      if (response.ok) {
        // Handle successful response
        console.log("Tour updated successfully")
        alert("Tour Form update successful")
        // Possibly redirect the user or show a success message
      } else {
        // Handle errors or unsuccessful response
        console.error("Failed to update tour")
      }
    } catch (error) {
      console.error("Error updating tour:", error)
    }
  }

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(
        `/api/tour/image/getImagesFromEmail?email=${email}`
      );
      if (response.ok) {
        const data = await response.json();
        setImages(data.images);
        console.log("Fetched images: ", images);
      } else {
        console.error("Failed to fetch images");
      }
    };
  

    fetchImages()
  }, [email]);

  return (
    <div
      className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-all ease-in duration-500 ${
        state
          ? "visible opacity-100 drop-shadow-2xl"
          : "rounded-sm invisible opacity-0"
      } `}
    >
      <div className="relative flex flex-col rounded-lg shadow-md bg-dim-grey w-[20rem] lg:w-[35rem] font-bold text-black h-[32rem] lg:h-[40rem] overflow-y-scroll">
        <div className="flex flex-col justify-start">
          <button
            onClick={action}
            className="absolute top-0 right-0 mt-4 mr-4 z-10"
          >
            <Image src={closeIcon} alt="clsbtn" className="" width={20} />
          </button>
        </div>
        <div className="flex flex-col mt-12 px-10 pb-5">
          <h2 className="text-2xl text-center">My Tour</h2>
          {data.map((data, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-row text-white font-normal py-1 mt-3 bg-blue rounded-lg w-full drop-shadow-md">
                <p
                  className="w-full pl-5 cursor-pointer"
                  onClick={() => {
                    const updatedShowInfo = [...showInfo] // Make a copy of the showInfo array
                    updatedShowInfo[index] = !updatedShowInfo[index] // Toggle the value at the specific index
                    setShowInfo(updatedShowInfo) // Update the state with the modified array
                  }}
                >
                  {data.tour_name}
                </p>
                <input
                  type="checkbox"
                  className={`${
                    showAllSelectBox
                      ? "visible opacity-100"
                      : "invisible opacity-0"
                  } checkbox ml-auto mr-5 checkbox-accent border-[1.5px] border-dashed border-white`}
                  checked={checkedStatus[data.tour_id]} // Set checked status based on the state
                  onChange={() => handleCheckboxClick(data.tour_id)}
                />
              </div>

              <div
                className={`transition-all ease-in duration-00 ${
                  showInfo[index] ? "h-auto opacity-100" : "h-0 opacity-0"
                }`}
              >
                {showInfo[index] && (
                  <div className="flex flex-col bg-white mt-3 pl-5 py-2 pr-2 rounded-lg gap-y-3 drop-shadow-md cursor-pointer"
                    onClick={() => router.push(`/TourMapPage/${data.tour_id}`)}>
                    <h3 className="text-md mt-2">{data.tour_name}</h3>
                    <div className="flex flex-row lg:flex-row mt-1 gap-2 flex-wrap lg:w-auto">
                      <Button
                        type="button"
                        buttonStyle="px-1 lg:px-2 py-1 w-fit bg-yellow text-white rounded-lg normal-case border-0 text-sm font-normal"
                        label={`#${data.official_tag}`}
                      ></Button>                      
                      {data.tags &&
                        data.tags.filter((tag) => tag).length > 0 &&
                        data.tags
                          .filter((tag) => tag)
                          .map((tag, index) => (
                            <Button
                              key={index} // Using index as a key, consider a more stable key if possible
                              type="button"
                              buttonStyle="px-1 lg:px-2 py-1 w-fit bg-grey text-black rounded-lg normal-case border-0 text-sm font-normal"
                              label={`#${tag}`} // Prepend "#" to each tag name
                            />
                          ))}
                    </div>
                    <p className="font-normal">{data.description}</p>
                    {/* <div className="flex flex-row flex-wrap">
                      <p className="font-normal">Places:&nbsp;</p>
                      {data.places &&
                        data.places.filter((place) => place).length > 0 &&
                        data.places
                          .filter((place) => place)
                          .map((place, index) => (
                            <p className="font-normal">{place}</p>
                          ))}
                    </div> */}
                    <div className="flex flex-row">
                      {/* <p className="font-normal">Places:&nbsp;</p>
                      {data.places &&
                        data.places.filter((place) => place).length > 0 &&
                        data.places
                          .filter((place) => place)
                          .map((place, index) => (
                            <p className="font-normal">{place}</p>
                          ))} */}
                      <figure className="lg:w-[5%]"><Image src={placePinIcon} alt="pic" /></figure>
                      <p className="font-normal flex-wrap">Places: {formatPlaces(data.places)}</p>
                    </div>
                    {/* <div className="flex gap-x-2 w-2/3 overflow-x-scroll">
                      <figure>
                        {" "}
                        <Image alt="pic" src={ferryWheelPic} />{" "}
                      </figure>
                      <figure>
                        {" "}
                        <Image alt="pic" src={holmesPic} />{" "}
                      </figure>
                      <figure>
                        {" "}
                        <Image alt="pic" src={holmesPic} />{" "}
                      </figure>
                    </div> */}
                    {/* <div className="h-[130px] flex-shrink-0"> */}
                    <div className="flex gap-x-2 h-[100px] flex-shrink-0 overflow-x-scroll">
                      {images && images.length > 0 ? (
                        images.map((imgUrl, imgIndex) => (
                            <Image
                              key={imgIndex}
                              alt={`image-${imgIndex}`}
                              src={imgUrl ? imgUrl : altImage.src}
                              className="w-[160px] h-[100px] object-cover rounded-md"                              
                              width={100}
                              height={100}
                            />
                        ))
                      ) : (
                        <p>Loading images...</p>
                      )}
                    </div>
                    <button className="rounded-lg py-2 px-4 normal-case font-normal text-white ml-auto mr-5 bg-blue"
                    onClick={(event) => {
                      event.stopPropagation()
                      handleEdit(data.tour_id)
                    }}>
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
          {showAllSelectBox ? (
            <div className="flex px-1 lg:px-10">
              <button
                className="mr-auto justify-self-start rounded-lg mt-16 py-2 px-4 normal-case font-normal text-black bg-dark-grey"
                onClick={() => setShowAllSelectBox(!showAllSelectBox)}
              >
                Cancel
              </button>
              <button
                className="ml-auto rounded-lg mt-16 py-2 px-4 normal-case font-normal text-white bg-red"
                onClick={() => setShowDeletePopUp(!showDeletePopUp)}
              >
                Delete
              </button>
            </div>
          ) : (
            <button
              className="rounded-lg mt-16 py-2 px-4 normal-case font-normal text-white ml-auto mr-10 bg-blue"
              onClick={() => setShowAllSelectBox(!showAllSelectBox)}
            >
              Select
            </button>
          )}

          <div
            className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-opacity ease-in duration-200  ${
              showDeletePopUp
                ? "visible opacity-100 shadow-md bg-dim-grey w-[20rem] lg:w-[35rem] border-2"
                : "rounded-sm invisible opacity-0"
            } `}
          >
            <div className="flex flex-col p-7">
              <p className="text-lg">
                Do you want to confirm to delete your Nebu?
              </p>
              <div className="flex px-10">
                <button
                  className="mr-auto justify-self-start rounded-lg mt-16 py-2 px-4 normal-case font-normal text-black bg-dark-grey"
                  onClick={() => setShowDeletePopUp(!showDeletePopUp)}
                >
                  Cancel
                </button>
                <button
                  className="ml-auto rounded-lg mt-16 py-2 px-4 normal-case font-normal text-white bg-red"
                  onClick={() => deleteSelectedTours()}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>

          <div
            className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-all ease-in duration-500 ${
              showEditTour
                ? "visible opacity-100 drop-shadow-2xl"
                : "rounded-sm invisible opacity-0"
            } `}
          >
            <div className=" bg-white font-bold modal-box w-screen text-black">
              <div className="flex justify-end mb-2">
                <button onClick={() => setShowEditTour(false)}>
                  <Image src={closeImage} alt="clsbtn" className="pt-2" width={20} />
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
              <div className="flex flex-col mt-4 mb-16">
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
              { !showEditTour && <div className="flex flex-col mt-4">
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
              </div>}
              { !showEditTour && <div className="flex flex-col mt-4">
                <h3 className="text-lg mt-8">Place</h3>
                {places.map((place, index) => (
                  <div
                    key={place.place_id}
                    className="w-fit text-black mb-1 cursor-pointer"
                    onClick={() => handleDeleteClick("place", place.place_id, place.place_name)}
                  >
                    <h3 className="bg-white text-black">
                      - {truncatePlace(String(place.place_name))}
                    </h3>
                  </div>
                ))}
                {waypoints.length > 0 && (
                  <h3 className="text-lg mt-4">Waypoint</h3>
                )}
                {waypoints.length > 0 && waypoints.map((waypoint, index) => (
                  <div
                    key={waypoint.waypoint_id}
                    className="w-fit text-black mb-1 cursor-pointer"
                    onClick={() => handleDeleteClick("waypoint", waypoint.waypoint_id, waypoint.waypoint_name)}
                  >
                    <h3 className="bg-white text-black">
                      - {truncatePlace(String(waypoint.waypoint_name))}
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
              </div>}
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
        </div>
      </div>
    </div>
  )
}
