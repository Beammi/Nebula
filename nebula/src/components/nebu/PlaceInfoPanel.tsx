import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"

import towerBridgePic from "../../../public/images/tower-bridge-pic.png"
import shareIcon from "../../../public/images/share-pic.png"
import directionsIcon from "../../../public/images/directions-pic.png"
import recommendIcon from "../../../public/images/recommend-tour-pic.png"
import bookmarkIcon from "../../../public/images/bookmark-pic.png"
import bookmarkSavedIcon from "../../../public/images/bookmarkSaved.png"
import filterIcon from "../../../public/images/filter-icon.png"
import closeIcon from "../../../public/images/close.png";
import { saveBookmark } from "@/utils/saveBookmarkAPI"

import smallPin from "../../../public/images/small-pin.png"
import smallShop from "../../../public/images/small-shop.png"
import smallClock from "../../../public/images/small-clock.png"
import smallWorld from "../../../public/images/small-world.png"
import smallPhone from "../../../public/images/small-phone.png"
import otherNebuPic1 from "../../../public/images/others-nebu-1.png"
import otherNebuPic2 from "../../../public/images/others-nebu-2.png"
import altImage from "../../../public/images/altImage.png"
import Link from "next/link"
import RatingInput from "../RatingInput"
import Ratings from "../Ratings"
import OtherNebu from "./OtherNebu"
import Button from "../Button"
import { supabase } from "@/lib/supabaseClient"
import ViewTourList from "@/components/tour/ViewTourList"
import { useRouter } from "next/router"

export default function PlaceInfoPanel({
  toggle,
  action,
  nebu,
  onRecommendTour,
  panelStyle = {}
}) {
  const [overviewSection, setOverviewSection] = useState(true)
  const [rateCommentSection, setRateCommentSection] = useState(false)
  const [othersNebuSection, setOthersNebuSection] = useState(false)
  const [mobileInfoPanel, setMobileInfoPanel] = useState(false)
  const [showViewTourList, setShowViewTourList] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [email, setEmail] = useState("")
  const [provider, setProvider] = useState("")
  const [userId, setUserId] = useState("")
  const panelRef = useRef(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [avgRating, setAvgRating] = useState(0)
  const [sortOption, setSortOption] = useState("Newest")
  const router = useRouter()
  // const handleShare = () => {
  //   if (navigator.share) {
  //     navigator.share({
  //       title: document.title,
  //       url: window.location.href,
  //     }).then(() => {
  //       console.log('Successfully shared');
  //     }).catch((error) => {
  //       console.error('Something went wrong sharing the blog', error);
  //     });
  //   } else {
  //     // Fallback for browsers that do not support the Web Share API
  //     const currentPageUrl = window.location.href;
  //     navigator.clipboard.writeText(currentPageUrl).then(() => {
  //       alert('Link copied to clipboard!');
  //     }, (err) => {
  //       console.error('Could not copy link: ', err);
  //       alert('Failed to copy link.');
  //     });
  //   }
  // };
  // const handleShare = () => {
  //   const currentPageUrl = window.location.href;
  //   navigator.clipboard.writeText(currentPageUrl).then(() => {
  //     alert('Link copied to clipboard!');
  //   }, (err) => {
  //     console.error('Could not copy link: ', err);
  //     alert('Failed to copy link.');
  //   });
  // };
  // const handleShare = () => {
  //   const state = {
  //     filter: 'recent',
  //     viewMode: 'grid'
  //   };
  
  //   // Convert state object to URL search parameters
  //   const params = new URLSearchParams(state).toString();
  //   const urlWithState = `${window.location.origin}${window.location.pathname}?${params}`;
    
  //   navigator.clipboard.writeText(urlWithState).then(() => {
  //     alert('Link with state copied to clipboard!');
  //   }, (err) => {
  //     console.error('Could not copy link: ', err);
  //     alert('Failed to copy link.');
  //   });
  // };
// In PlaceInfoPanel component
const handleShare = () => {
  const nebuId = nebu?.nebu_id; // Assuming `nebu` is the prop for the current nebula being displayed

  if (!nebuId) {
    alert("No Nebu selected to share.");
    return;
  }

  const shareUrl = `${window.location.origin}/home?nebuId=${nebuId}`;

  navigator.clipboard.writeText(shareUrl).then(() => {
    alert('Link copied to clipboard!');
  }).catch((error) => {
    console.error('Failed to copy link:', error);
  });
};

  
  const formatDaysOpen = (nebu) => {
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
      (day, index) => nebu[`open_${day.toLowerCase()}`]
    )
    return openDays.join(", ")
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
  const checkBookmark = async (userId, nebuId) => {
    const url = `/api/bookmark/checkBookmarkNebu?nebuId=${encodeURIComponent(
      nebu?.nebu_id
    )}&userId=${encodeURIComponent(userId)}`
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (response.ok) {
        setIsSaved(true)
      }else{
        const resetSaved = !isSaved
        setIsSaved(false)
      }
    } catch (error) {
      console.error("not bookmark this nebu: ", error)
      
    }
    // const resetSaved = !isSaved
    // setIsSaved(false)
  }
  const fetchAverageRatings = async () => {
    const url = `/api/nebu/rating/getAverageRating?nebuId=${encodeURIComponent(
      nebu?.nebu_id
    )}`
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (response.ok) {
        const rating = data.averageRating
        setAvgRating(rating)
      } else {
        throw new Error(
          data.message || "An error occurred while fetching the nebu rating"
        )
      }
    } catch (error) {
      console.error("Failed to fetch nebu rating:", error)
    }
  }
  useEffect(() => {
    getEmail()
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
  useEffect(() => {
    checkBookmark(userId, nebu?.nebu_id)

  }, [nebu])
  useEffect(()=>{
    setAvgRating(0)
    fetchAverageRatings()

  },[nebu])
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

  function closeViewTourList() {
    setShowViewTourList(false)
  }

  // Placeholder function for saving to the database
  // const saveToDatabase = async () => {

  //   console.log("Saving to database...")
  //   // For example: await api.savePlace({ id: nebu.id, saved: isSaved });
  // }

  // Function to toggle save status and trigger database update
  const handleSaveClick = () => {
    const newSavedStatus = !isSaved
    setIsSaved(newSavedStatus)
  }
  const handleSaveBookmark = async () => {
    try {
      const result = await saveBookmark(userId, nebu.nebu_id)
      alert("Bookmark saved successfully!")
      const newSavedStatus = !isSaved
      setIsSaved(newSavedStatus)
      // Update UI as needed
    } catch (error) {
      alert("You already saved this bookmark!!. Failed to save bookmark.")
    }
  }
  const handleRecommendTourClick = () => {
    setShowViewTourList(true) // Set to true to show the ViewTourList
  }
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

  useEffect(() => {
    console.log("Mobile Info Panel:", mobileInfoPanel);
  }, [mobileInfoPanel]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 450); // Adjust this threshold according to your design
    }

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize); // Listen for window resize events

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up the event listener
    };
  }, []);

  async function handleClickEmail(email){
    const response = await fetch(`/api/search/userprofile/getDisplayNameFromEmail?email=${email}`)
    const data = await response.json()

    if (data.display_name) { // when data is only one (= Object), not Array
      // setCurrentPosition([parseFloat(data.places[0].latitude), parseFloat(data.places[0].longitude)]);
      // router.push
    } else {
      console.error("No places found in the tour data.");
    }

  }

  return (
    <div
      className={`fixed overflow-y-scroll w-full rounded-t-xl lg:top-0 lg:w-[25%] ${panelStyle ? panelStyle : "z-10"} h-screen bg-white text-black transition-all duration-150 ease-in-out 
      ${toggle ? "opacity-100 drop-shadow-2xl" : "hidden"}
      ${mobileInfoPanel ? "absolute top-0" : "top-1/2"}
      ${isMobile ? "absolute" : "fixed"}
      `}
      
      ref={panelRef}
    >
      <div className=" text-black ">
        {nebu ? (
          <div
            className="rounded-t-full flex flex-col"
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
              {nebu.images && nebu.images.length > 0 ? (
                nebu.images.map((imgUrl, imgIndex) => (
                  <figure key={imgIndex} className="carousel-item w-full">
                    <img
                      alt={`image-${imgIndex}`}
                      src={imgUrl ? imgUrl : altImage.src}
                      // className="w-full h-[240px] lg:h-[290px]"
                      className="w-full h-[240px] lg:h-[calc(100vh/3.5)]"
                    />
                  </figure>
                ))
              ) : (
                <img
                  src={altImage.src}
                  className="w-full h-[240px] lg:h-[290px]"
                />
              )}
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
            
            <div className="flex flex-col pl-4 pt-2 gap-y-1">
              <div className="flex flex-row justify-between mt-3">
                <h3 className="font-bold text-xl text-black  bg-white w-fit">
                  {nebu.title}
                </h3>
                <button onClick={action}>
                  <Image
                    src={closeIcon}
                    alt="clsbtn"
                    className="mr-5"
                    width={18}
                  />
                </button>
              </div>

              <div className="flex flex-row mb-2">
                <div className="rating">
                  <div className="-mt-2 mr-2">{renderStars(avgRating)}</div>                  
                  <label className="text-sm leading-4 text-yellow">
                    {avgRating}
                  </label>
                </div>
                <label className="text-sm text-black-grey ml-3 leading-4 cursor-pointer hover:underline"
                  onClick={() => handleClickEmail()}>
                  Added by {nebu.email}
                </label>
              </div>

              <div className="flex flex-row mt-1 gap-x-1 overflow-x-auto">
                <button
                  className="btn btn-outline btn-sm text-blue rounded-2xl normal-case hover:bg-light-grey"
                  onClick={() => onRecommendTour(nebu)}
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
                  Recommend Tour
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

                <button className="btn btn-outline btn-sm text-black rounded-2xl normal-case hover:bg-light-grey "
                onClick={handleShare}>
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
                  label={`#${nebu.official_tag}`}
                  onClick={() => router.push(`/tag/${nebu.official_tag}`)}
                ></Button>
                {nebu.tags &&
                  nebu.tags.filter((tag) => tag).length > 0 &&
                  nebu.tags
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

              {/* <p>{nebu.description}</p> */}
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

                <div className="flex flex-col items-center justify-end">
                  <button
                    className={`btn transition-all duration-150 ease-in-out normal-case bg-transparent hover:bg-transparent text-black  active:text-blue hover:text-black-grey border-x-0 border-t-0 border-b-4 hover:border-b-4 hover:border-grey  font-medium rounded-none
                        ${
                          othersNebuSection
                            ? "text-blue border-b-4 border-blue"
                            : "text-black border-white"
                        }`}
                    onClick={openOthersNebuSection}
                  >
                    Others Nebu
                  </button>
                </div>
              </div>

              <div className="w-full h-[3px] bg-grey "></div>

              {overviewSection && (
                <>
                  <p className="ml-7 mt-10 pr-6">{nebu.description}</p>
                  <div className="w-full h-[3px] bg-grey mt-10"></div>
                </>
              )}
            </div>

            {overviewSection && (
              <div className="flex flex-col my-8 ml-7 gap-y-6 transition-all delay-300 ease-in-out">
                <div className="flex flex-row">
                  <figure className="">
                    <Image
                      src={smallPin}
                      alt="pic"
                      className="mr-4"
                      width={22}
                      height={22}
                    />
                  </figure>
                  <p className="leading-5 ml-5">{nebu.place_name}</p>
                </div>

                {/* <div className="flex flex-row">
                  <figure className="">
                    <Image
                      src={smallShop}
                      alt="pic"
                      className="mr-4"
                      width={22}
                      height={20}
                    />
                  </figure>
                  <p className="leading-5">Mon - Sat, 8.00 - 22.00</p>
                </div> */}
                {/* Operating Hours */}
                <div className="flex flex-row">
                  <figure className="">
                    <Image
                      src={smallShop}
                      alt="shop icon"
                      className="mr-4"
                      width={22}
                      height={20}
                    />
                  </figure>
                  <p className="leading-5">
                    {formatDaysOpen(nebu)}
                    <div>
                      {nebu.open_time} - {nebu.close_time}
                    </div>
                  </p>
                </div>
                {/* <div className="flex flex-row">
                  <figure className="">
                    <Image
                      src={smallClock}
                      alt="pic"
                      className="mr-4"
                      width={19.7}
                      height={18}
                    />
                  </figure>
                  <p className="leading-5">End this Monday</p>
                </div> */}
                <div className="flex flex-row">
                  <figure className="">
                    <Image
                      src={smallClock}
                      alt="clock icon"
                      className="mr-4"
                      width={19.7}
                      height={18}
                    />
                  </figure>
                  <p className="leading-5">
                    {nebu.end_time ? (
                      <>
                        {new Date(nebu.start_time).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}{" "}
                        -{" "}
                        {new Date(nebu.end_time).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </>
                    ) : (
                      <>
                        {new Date(nebu.start_time).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}{" "}
                        - Permanent
                      </>
                    )}
                  </p>
                </div>

                <div className="flex flex-row">
                  <figure className="">
                    <Image
                      src={smallWorld}
                      alt="pic"
                      className="mr-4"
                      width={19}
                      height={19}
                    />
                  </figure>
                  <p className="leading-5">{nebu.website}</p>
                </div>

                <div className="flex flex-row">
                  <figure className="">
                    <Image
                      src={smallPhone}
                      alt="pic"
                      className="mr-4"
                      width={18.6}
                      height={18.6}
                    />
                  </figure>
                  <p className="leading-5">{nebu.phone_number}</p>
                </div>
              </div>
            )}

            {rateCommentSection && (
              <div>
                <RatingInput nebuId={nebu.nebu_id} />
                <Ratings nebuId={nebu.nebu_id}></Ratings>
              </div>
            )}

            {othersNebuSection && (
              <div className="flex flex-col my-4 mx-7 transition-all delay-300 ease-in-out">
                <div className="select-container ml-auto bg-white relative rounded-lg mr-3">
                  <select className="select bg-grey rounded-lg select-sm"
                    onChange={(e) => {
                      setSortOption(e.target.value)
                    }}>
                    {/* <option disabled selected>Filter</option> */}
                    <option>Newest</option>
                    <option>High Rated</option>
                    <option>Oldest</option>
                  </select>
                  <figure className="select-icon absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Image src={filterIcon} alt="pic" className="" />
                  </figure>
                </div>
                <div>
                  <OtherNebu
                    originalNebuId={nebu.nebu_id}
                    placeName={nebu.place_name}
                    sortOption={sortOption}
                  ></OtherNebu>
                </div>
              </div>
            )}

            {/* Add other information as needed */}
          </div>
        ) : (
          <p>No place selected</p>
        )}
      </div>
      {/* <ViewTourList action={showViewTourList} toggle={closeViewTourList} name={nebu?.title} /> */}
      {/* Conditional rendering based on showViewTourList state */}
    </div>
  )
}
