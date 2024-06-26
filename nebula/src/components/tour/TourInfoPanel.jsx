import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"

import towerBridgePic from "../../../public/images/tower-bridge-pic.png"
import shareIcon from "../../../public/images/share-pic.png"
import directionsIcon from "../../../public/images/directions-pic.png"
import recommendIcon from "../../../public/images/recommend-tour-pic.png"
import bookmarkIcon from "../../../public/images/bookmark-pic.png"
import bookmarkSavedIcon from "../../../public/images/bookmarkSaved.png"
import filterIcon from "../../../public/images/filter-icon.png"
import { saveBookmark } from "@/utils/saveBookmarkAPI"
import smallFlag from "../../../public/images/flagPurple.png"
import otherNebuPic1 from "../../../public/images/others-nebu-1.png"
import otherNebuPic2 from "../../../public/images/others-nebu-2.png"
import altImage from "../../../public/images/altImage.png"
import Link from "next/link"
import RatingInput from "../RatingInput"
import Ratings from "../Ratings"
import Button from "../Button"
import { useRouter } from "next/router"
import TourRatings from "./TourRatings"
import TourRatingInput from "./TourRatingInput"
import { saveBookmarkTour } from "@/utils/saveBookmarkTourAPI"
import { supabase } from "@/lib/supabaseClient"
import ViewOtherTours from "./ViewOtherTour"
export default function TourInfoPanel({ toggle, tour, toggleViewOtherTours }) {
  const [overviewSection, setOverviewSection] = useState(true)
  const [rateCommentSection, setRateCommentSection] = useState(false)
  const [othersNebuSection, setOthersNebuSection] = useState(false)
  const [mobileInfoPanel, setMobileInfoPanel] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const router = useRouter() // Add this line to get access to router query
  const { tourId } = router.query // Retrieve tourId from router query
  const [userId, setUserId] = useState("")
  const [avgRating, setAvgRating] = useState(0)
  const panelRef = useRef(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [tourDetails, setTourDetails] = useState(null)
  const [tourPhotos, setTourPhotos] = useState([])
  const [api, setApi] = useState([])
  const [showViewTourList, setShowViewTourList] = useState(false)
  const [email, setEmail] = useState("")
  const [provider, setProvider] = useState("")
  const [placeName, setPlaceName] = useState("")
  const toggleViewTourList = () => {
    setShowViewTourList(!showViewTourList)
  }

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
    const userEmail =
      user.app_metadata.provider === "email"
        ? user.email
        : user.user_metadata.email
    const userProvider = user.app_metadata.provider || ""

    setEmail(userEmail)
    setProvider(userProvider)
    fetchProfile(userEmail, userProvider)
  }
  const fetchProfile = async (email, provider) => {
    const url = `/api/users/getUserProfile?email=${encodeURIComponent(
      email
    )}&provider=${encodeURIComponent(provider)}`
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (response.ok) {
        const userIdForFetch = data.user_id
        setUserId(userIdForFetch)
      } else {
        throw new Error(
          data.message || "An error occurred while fetching the profile"
        )
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error)
    }
  }
  const fetchAverageRatings = async () => {
    const url = `/api/tour/rating/getAverageRating?tourId=${encodeURIComponent(
      tourId
    )}`
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (response.ok) {
        const rating = data.averageRating
        setAvgRating(rating)
      } else {
        throw new Error(
          data.message || "An error occurred while fetching the tour rating"
        )
      }
    } catch (error) {
      console.error("Failed to fetch tour rating:", error)
    }
  }
  useEffect(() => {
    getEmail()
    fetchAverageRatings()
  }, [])
  const fetchPhotoFromNebu = async (place_name) => {
    try {
      const response = await fetch(
        `/api/tour/getImagesFromNebus?place_name=${place_name}`
      )
      if (response.ok) {
        const photos = await response.json()
        setApi(photos)
        console.log("api photo ", api)
        api.forEach((item) => {
          console.log("api ", item)
        })
      } else {
        console.error("Failed to fetch image details")
      }
    } catch (error) {
      console.error("Error fetching image details:", error)
    }
  }
  useEffect(() => {
    setTourPhotos(api)
    // console.log("tour photo ",tourPhotos.images[0])
  }, [api])
  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const response = await fetch(`/api/tour/getTourById?tour_id=${tourId}`)
        if (response.ok) {
          const data = await response.json()
          setTourDetails(data)
          fetchPhotoFromNebu(data.places[0].place_name)
          setPlaceName(data.places[0].place_name)
        } else {
          console.error("Failed to fetch tour details")
        }
      } catch (error) {
        console.error("Error fetching tour details:", error)
      }
    }

    fetchTourDetails()
  }, [])
  // useEffect(() => {
  //   // Assuming `tourDetails.places[0].place_name` is available and correct
  //   if (tourDetails && tourDetails.places && tourDetails.places.length > 0) {
  //     fetchPhotoFromNebu(tourDetails.places[0].place_name)
  //   }
  // }, [tourDetails])
  const formatDaysOpen = (tour) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]
    const openDays = days.filter(
      (day, index) => tour[`open_${day.toLowerCase()}`]
    )
    return openDays.join(", ")
  }

  useEffect(() => {
    console.log("O: ", panelRef)

    const handleScroll = () => {
      setScrollPosition(panelRef.current.scrollTop)
    }

    if (panelRef.current) {
      panelRef.current.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (panelRef.current) {
        panelRef.current.removeEventListener("scroll", handleScroll)
      }
    }
  }, [panelRef])

  function openOverviewSection() {
    setOverviewSection(true)
    setRateCommentSection(false)
    setOthersNebuSection(false)
  }

  function openRateCommentSection() {
    setOverviewSection(false)
    setRateCommentSection(true)
    setOthersNebuSection(false)
  }

  function openOthersNebuSection() {
    setOverviewSection(false)
    setRateCommentSection(false)
    setOthersNebuSection(true)
  }

  function expandPlaceInfoPanel() {
    setMobileInfoPanel(!mobileInfoPanel)
  }

  function minimizePlaceInfoPanel() {
    setMobileInfoPanel(false)
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

  // Placeholder function for saving to the database
  // const saveToDatabase = async () => {

  //   console.log("Saving to database...")
  //   // For example: await api.savePlace({ id: tour.id, saved: isSaved });
  // }

  // // Function to toggle save status and trigger database update
  // const handleSaveClick = () => {
  //   const newSavedStatus = !isSaved
  //   setIsSaved(newSavedStatus)
  //   saveToDatabase() // This would ideally pass necessary data for the save operation
  // }
  const handleShare = () => {
    const currentPageUrl = window.location.href
    navigator.clipboard.writeText(currentPageUrl).then(
      () => {
        alert("Link copied to clipboard!")
      },
      (err) => {
        console.error("Could not copy link: ", err)
        alert("Failed to copy link.")
      }
    )
  }
  const checkBookmark = async (userId, tourId) => {
    const url = `/api/bookmark/checkBookmarkTour?userId=${encodeURIComponent(
      userId
    )}&tourId=${encodeURIComponent(tourId)}`
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (response.ok) {
        setIsSaved(true)
      } else {
        const resetSaved = !isSaved
        setIsSaved(false)
      }
    } catch (error) {
      console.error("not bookmark this nebu: ", error)
    }
    const resetSaved = !isSaved
    setIsSaved(resetSaved)
  }
  const handleSaveBookmark = async () => {
    try {
      const result = await saveBookmarkTour(userId, tourDetails.tour_id)
      alert("Bookmark saved successfully!")
      const newSavedStatus = !isSaved
      setIsSaved(newSavedStatus)
    } catch (error) {
      alert("Failed to save bookmark.")
    }
  }
  useEffect(() => {
    // setIsSaved(false)
    checkBookmark(userId, tourId)
  }, [tourId])

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`inline-block w-4 h-4 ${
              index < (rating ?? 0)
                ? "text-yellow text-lg"
                : "text-slate-100 text-lg"
            } `}
          >
            ★
          </span>
        ))}
      </div>
    )
  }

  async function handleClickEmail(email){
    const response = await fetch(`/api/search/userprofile/getDisplayNameFromEmail?email=${email}`)
    const data = await response.json()
    
    if (data[0]) { 
      router.push(`/userprofile/${data[0]}`)
    } else {
      console.error("No display name");
    }

  }

  const handleEdit = (place_name) => {
    setShowViewTourList(true)
  }

  // Handle canceling or finishing the edit
  const handleCancelEdit = () => {
    setShowViewTourList(false)
  }
  const handleCloseEdit = () => {
    setShowViewTourList(false)
  }

  return (
    <div
      className={`absolute overflow-y-scroll  ${
        mobileInfoPanel ? "top-0" : "top-1/2"
      } w-full rounded-t-xl lg:top-0 2xl:w-1/4 lg:w-1/3 z-10 h-screen bg-white text-black transition-all duration-150 ease-in-out `}
      ref={panelRef}
    >
      <div className=" text-black ">
        {tourDetails ? (
          <div
            className="rounded-t-full"
            onScroll={() => {
              if (panelRef.current) {
                scrollPosition > 0
                  ? minimizePlaceInfoPanel()
                  : expandPlaceInfoPanel()
              }
            }}
          >
            <div
              className={`w-[60px] h-[3px] bg-black-grey my-3 mx-auto cursor-pointer lg:hidden`}
            ></div>
            <div className="carousel flex justify-center">
              {tourPhotos && tourPhotos.images?.length > 0 ? (
                tourPhotos.images.map((imgUrl, imgIndex) => (
                  <figure key={imgIndex} className="carousel-item w-full">
                    <img
                      alt={`image-${imgIndex}`}
                      src={imgUrl ? imgUrl : altImage.src}
                      className="w-full h-[240px] lg:h-[290px]"
                    />
                  </figure>
                ))
              ) : (
                // <img
                //   src={altImage.src}
                //   className="w-full h-[240px] lg:h-[290px]"
                // />
                <p>no image</p>
              )}
              {/* {tourPhotos.length > 0 && (
                <img
                  src={tourPhotos[0]}
                  alt="Tour Image"
                  className="w-full h-auto"
                />
              )} */}
            </div>
            <div className="-mt-14 mb-2 flex items-center justify-between">
              <div></div>{" "}
              {/* !! dont delete pls, it make the button go right corner */}
              <Button
                buttonStyle=" px-2 py-1 w-fit bg-black-grey opacity-75 text-white rounded-lg normal-case border-0 text-xs cursor-pointer"
                type="button"
                label={`slide for more images`}
              ></Button>
            </div>
            {/* {tour.images.map((imgUrl, imgIndex) =>
              imgUrl ? (
                <figure key={imgIndex}>
                  <img
                    alt={`image-${imgIndex}`}
                    src={imgUrl}
                    className="w-full h-[300px]"
                  />
                </figure>
              ) : (
                <p className="text-xs text-black">
                  There is no image in this tour.
                </p>
              )
            )} */}
            {/* <figure>
              <Image
                src={towerBridgePic}
                alt="pic"
                className="pt-0 mb-1 w-full "
              />
            </figure> */}
            <div className="flex flex-col pl-4 pt-2 gap-y-1">
              <div className="flex flex-row">
                <h3 className="font-bold text-xl text-black  bg-white w-fit">
                  {tourDetails.tour_name}
                </h3>
              </div>

              <div className="flex flex-row">
                <div className="rating rating-md mb-2">
                  <div className="-mt-2 mr-2">{renderStars(avgRating)}</div>

                  <label className="text-sm leading-4 text-yellow">
                    {avgRating}
                  </label>
                </div>
                <label className="text-sm text-black-grey ml-3 leading-4 cursor-pointer hover:underline"
                onClick={() => handleClickEmail(tourDetails.creator_email)}>
                  Added by {tourDetails.creator_email}
                </label>
              </div>

              <div className="flex flex-row mt-1 gap-x-1 overflow-x-auto">
                <button
                  className="btn btn-outline btn-sm text-blue rounded-2xl normal-case hover:bg-light-grey"
                  onClick={() => {
                    setShowViewTourList(true)
                  }}
                >
                  <figure>
                    <Image
                      src={recommendIcon}
                      alt="pic"
                      className=""
                      width={14}
                      height={21}
                    />
                  </figure>
                  Other Tour
                </button>

                <button
                  className="btn btn-outline btn-sm text-black rounded-2xl normal-case hover:bg-light-grey"
                  onClick={handleSaveBookmark}
                  style={{ display: "flex", alignItems: "center", gap: "4px" }} // Ensure alignment and spacing
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      position: "relative",
                    }}
                  >
                    {" "}
                    {/* Adjust size as needed */}
                    <Image
                      src={isSaved ? bookmarkSavedIcon : bookmarkIcon}
                      alt="Save"
                      layout="fill"
                      objectFit="contain" // This ensures the image respects the aspect ratio and fits within the container
                    />
                  </div>
                  Save
                </button>

                <button
                  className="btn btn-outline btn-sm text-black rounded-2xl normal-case hover:bg-light-grey "
                  onClick={handleShare}
                >
                  <figure>
                    <Image src={shareIcon} alt="pic" className="" width={23} />
                  </figure>
                  Share
                </button>
              </div>

              <div className="flex flex-row gap-x-2 flex-wrap max-w-full">
                <Button
                  buttonStyle=" px-2 py-1 w-fit bg-yellow text-white rounded-lg normal-case border-0 text-sm cursor-pointer"
                  type="button"
                  label={`#${tourDetails.official_tag}`}
                  onClick={() => router.push(`/tag/${tourDetails.official_tag}`)}
                ></Button>
                {tourDetails.tags &&
                  tourDetails.tags.filter((tag) => tag).length > 0 &&
                  tourDetails.tags
                    .filter((tag) => tag)
                    .map((tag, index) => (
                      <Button
                        key={index} // Using index as a key, consider a more stable key if possible
                        type="button"
                        buttonStyle="px-1 lg:px-2 py-1 w-fit whitespace-nowrap bg-grey text-black rounded-lg normal-case border-0 text-sm font-normal"
                        label={`#${tag}`} // Prepend "#" to each tag name
                        onClick={() => router.push(`/tag/${tag}`)}
                      />
                    ))}
                {/* <button
                  className=" px-2 py-1 w-fit bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer"
                  type="button"
                >
                  #bridge
                </button>
                <button
                  className=" px-2 py-1 w-fit bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer"
                  type="button"
                >
                  #natLikes
                </button> */}
              </div>

              {/* <p>{tour.description}</p> */}
            </div>

            <div className="flex flex-col pt-2">
              <div className="flex flex-row mt-4 ml-7 gap-x-7">
                <div className="flex flex-col items-center justify-end">
                  <button
                    className={`btn transition-all duration-150 ease-in-out normal-case bg-transparent hover:bg-transparent text-black  active:text-blue hover:text-black-grey border-x-0 border-t-0 border-b-4 hover:border-b-4 hover:border-grey  font-medium rounded-none
                      ${
                        overviewSection
                          ? "text-blue border-b-4 border-blue"
                          : "text-black border-white"
                      }`}
                    onClick={openOverviewSection}
                  >
                    Overview
                  </button>
                </div>

                <div className="flex flex-col items-center justify-end">
                  <button
                    className={`btn transition-all duration-150 ease-in-out normal-case bg-transparent hover:bg-transparent text-black  active:text-blue hover:text-black-grey border-x-0 border-t-0 border-b-4 hover:border-b-4 hover:border-grey  font-medium rounded-none
                      ${
                        rateCommentSection
                          ? "text-blue border-b-4 border-blue"
                          : "text-black border-white"
                      }`}
                    onClick={openRateCommentSection}
                  >
                    Rate & Comment
                  </button>
                </div>

                {/* <div className="flex flex-col items-center justify-end">
                  <button
                    className={`btn transition-all duration-150 ease-in-out normal-case bg-transparent hover:bg-transparent text-black  active:text-blue hover:text-black-grey border-x-0 border-t-0 border-b-4 hover:border-b-4 hover:border-grey  font-medium rounded-none
                        ${
                          othersNebuSection
                            ? "text-blue border-b-4 border-blue"
                            : "text-black border-white"
                        }`}
                    onClick={openOthersNebuSection}
                  >
                    Others Tour
                  </button>
                </div> */}
              </div>

              <div className="w-full h-[3px] bg-grey "></div>

              {overviewSection && (
                <>
                  <p className="ml-7 mt-10 pr-6">{tourDetails.description}</p>
                  <div className="w-full h-[3px] bg-grey mt-10"></div>
                </>
              )}
            </div>

            {overviewSection && (
              <div className="flex flex-col my-8 ml-7 gap-y-6 transition-all delay-300 ease-in-out">
                {tourDetails.places && tourDetails.places.length > 0 ? (
                  tourDetails.places.map((place, placeIndex) => (
                    <div className="flex flex-row" key={placeIndex}>
                      <figure className="">
                        <Image
                          src={smallFlag}
                          alt="pic"
                          className="mr-4"
                          width={18}
                          height={18}
                          
                        />
                      </figure>
                      <p className="leading-5 ml-5 mr-1" style={{ flex: '1', flexShrink: '1', flexBasis: '0', overflow: 'hidden' }}>
                      {/* <p className="leading-5 ml-5 mr-1 "> */}
                        {truncatePlace(place.place_name)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>Error in loading places...</p>
                )}
              </div>
            )}

            {rateCommentSection && (
              <div>
                <TourRatingInput tourId={tourId} />
                <TourRatings tourId={tourId}></TourRatings>
              </div>
            )}

            {othersNebuSection && (
              <div className="flex flex-col my-4 mx-7 transition-all delay-300 ease-in-out">
                <div className="select-container ml-auto bg-white relative rounded-lg mr-3">
                  <select className="select bg-grey rounded-lg select-sm">
                    {/* <option disabled selected>Filter</option> */}
                    <option>Newest</option>
                    <option>High Rated</option>
                    <option>Oldest</option>
                  </select>
                  <figure className="select-icon absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Image src={filterIcon} alt="pic" className="" />
                  </figure>
                </div>

                <div className="flex flex-col gap-y-7 mt-2">
                  <div className="px-3 flex items-top bg-white cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2550&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500"
                      className="h-12 w-12 border-2 border-white rounded-full mt-1"
                      alt=""
                    />
                    <div className="ml-4 pr-7">
                      <p className="text-sm font-medium text-black -mb-0.5">
                        Beammi_2000
                      </p>
                      <div className="rating flex my-1">
                        <input
                          type="radio"
                          name="rating-1"
                          className="mask mask-star bg-yellow h-3 w-5"
                        />
                        <input
                          type="radio"
                          name="rating-1"
                          className="mask mask-star bg-yellow h-3 w-5"
                        />
                        <input
                          type="radio"
                          name="rating-1"
                          className="mask mask-star bg-yellow h-3 w-5"
                        />
                        <input
                          type="radio"
                          name="rating-1"
                          className="mask mask-star bg-yellow h-3 w-5"
                          checked
                        />
                        <input
                          type="radio"
                          name="rating-1"
                          className="mask mask-star bg-black-grey h-3 w-5"
                        />
                        <label className="text-sm leading-4 text-yellow">
                          4.0
                        </label>
                      </div>
                      <p className="text-sm -mt-0.5 font-normal text-black ">
                        When the night comes, the view is fantastic. This is
                        unbelievable.
                      </p>
                      <figure>
                        <Image
                          src={otherNebuPic1}
                          alt="pic"
                          className="pt-0 my-2 rounded-md"
                        />
                      </figure>
                    </div>
                  </div>

                  <div className="px-3 flex items-top bg-white cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500"
                      className="h-12 w-12 border-2 border-white rounded-full mt-1"
                      alt=""
                    />
                    <div className="ml-4 pr-7">
                      <p className="text-sm font-medium text-black -mb-0.5">
                        BirdieInwZaa
                      </p>
                      <div className="rating flex my-1">
                        <input
                          type="radio"
                          name="rating-1"
                          className="mask mask-star bg-yellow h-3 w-5"
                        />
                        <input
                          type="radio"
                          name="rating-1"
                          className="mask mask-star bg-yellow h-3 w-5"
                        />
                        <input
                          type="radio"
                          name="rating-1"
                          className="mask mask-star bg-yellow h-3 w-5"
                        />
                        <input
                          type="radio"
                          name="rating-1"
                          className="mask mask-star bg-yellow h-3 w-5"
                          checked
                        />
                        <input
                          type="radio"
                          name="rating-1"
                          className="mask mask-star bg-black-grey h-3 w-5"
                        />
                        <label className="text-sm leading-4 text-yellow">
                          4.0
                        </label>
                      </div>
                      <p className="text-sm -mt-0.5 font-normal text-black">
                        Closed-up view with a clear sky is mind blowing.
                      </p>
                      <figure>
                        <Image
                          src={otherNebuPic2}
                          alt="pic"
                          className="pt-0 my-2 rounded-md"
                        />
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Add other information as needed */}
          </div>
        ) : (
          <p>No place selected</p>
        )}
      </div>
      {showViewTourList && (
        <ViewOtherTours placeName={placeName}     onClose={() => setShowViewTourList(false)} // Pass onClose prop
        />
      )}
    </div>
  )
}
