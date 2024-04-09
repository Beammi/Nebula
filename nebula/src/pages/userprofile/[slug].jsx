// import Button from "./Button"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import closeIcon from "../../../public/images/close.png"

import { useRouter } from "next/router"
import SearchBar from "@/components/SearchBar"
import ProfileButton from "@/components/ProfileButton"
import DynamicMap from "@/components/map/DynamicMap"
import Button from "@/components/Button"
import AddNebu from "@/components/nebu/AddNebu"
import AddTour from "@/components/tour/AddTour"
import PlaceInfoPanel from "@/components/nebu/PlaceInfoPanel"

import smallHashtag from "../../../public/images/smallHashtag_blue.png";
import filterIcon from "../../../public/images/filter-icon.png"
import yellowPin from "../../../public/images/yellowPin.png"
import purplePin from "../../../public/images/purplePin.png"
import purpleFlag from "../../../public/images/flagPurple.png"
import yellowFlag from "../../../public/images/yellowFlag.png"
import placePinIcon from "../../../public/images/placePinIcon.png"
import { useLocation } from "@/contexts/LocationContext"
import { supabase } from "../../lib/supabaseClient"

// import smallHashtag from "../../public/images/smallHashtag_blue.png"
// import filterIcon from "../../public/images/filter-icon.png"
// import skyPic from "../../public/images/skyPic.png"
// import profilePic from "../../public/images/lionelPic.png"
import holmesPic from "../../../public/images/holmesPic.png"
import ferryWheelPic from "../../../public/images/ferryWheelPic.png"
import whiteCloseIcon from "../../../public/images/whiteCloseIcon.png"
import altImage from "../../../public/images/altImage.png"

import Link from "next/link"
// import smallHashtag from "../../public/images/smallHashtag.png";

export default function UserProfile(props) {

  const [addNebuState, setAddnebu] = useState(false)
  const [addTourState, setAddTourState] = useState(false)
  const [addNebuDropDown, setaddNebuDropdown] = useState(false)
  const [profileName,setProfileName] = useState("")
  const [accountData, setAccountData] = useState([])
  const [nebuData, setNebuData] = useState([])
  const [tourData, setTourData] = useState([]) 
  const [nebu, setNebu] = useState([]);
  const [tourApi, setTourApi] = useState([])
  const [nebuApi, setNebuApi] = useState([])
  const [userAccApi, setUserAccApi] = useState([])
  const [showPlaceInfoPanel, setShowPlaceInfoPanel] = useState(false)
  const [showViewTourList, setShowViewTourList] = useState(false)
  const [images, setImages] = useState([])
  const router = useRouter()
  const {
    currentPlace,
    setCurrentPlace,
    setEnableContinuousUpdate,
    setCurrentPosition,
  } = useLocation() 

  const accountName = Array.isArray(router.query.slug) ? router.query.slug[0] : router.query.slug;

  console.log("User Acc name: ", accountName);

  useEffect(() => {
    checkSession()
    checkProviderAccount()
    fetchAccountProfile()
    fetchImages()
  }, [accountName])

  async function fetchAccountProfile(){
    // const url = `/api/search/getUsersByDisplayName?searchKey=${accountName}`
    // try {
    //   const response = await fetch(url)
    //   if (!response.ok) {
    //     throw new Error("Network response was not ok")
    //   }
    //   // const data: string[] = await response.json(); // normal array same as write in api
    //   const data = await response.json(); // normal array same as write in api
    //   setAccountData(data)
    //   console.log("acc data: ", accountData);
    //   // console.log("acc d2: ", accountData.map());
      
      

    // } catch (error) {
    //   console.error("Fetch error:", error)
    // }

    try {

      const [userAccountResponse, userNebuResponse, userTourResponse] = await Promise.all([
        fetch(`/api/search/getUsersByDisplayName?searchKey=${accountName}`),
        fetch(`/api/search/userprofile/getNebuFromDisplayName?displayName=${accountName}`),
        fetch(`/api/search/userprofile/getTourFromDisplayName?displayName=${accountName}`),
      ]);

      // Parse responses
      const [userAccountData, userNebuData, userTourData] = await Promise.all([
        userAccountResponse.json(),
        userNebuResponse.json(),
        userTourResponse.json(),
      ]);

      if (userAccountData.length > 0) {      
        setAccountData(userAccountData)
      }
      if (userNebuData.length > 0) {
        setNebuApi(userNebuData)
      }
      if (userTourData.length > 0) {        
        setTourApi(userTourData)
      }

      // setApi(formattedData)
      console.log("data acc: ", accountData);
      console.log("data neb: ", nebuData);
      console.log("data tou: ", tourData);

    } catch (error) {
      console.error("Fetch error:", error)
    }
  }

  useEffect(() => {
    console.log("API neb:", nebuApi);
    setNebuData(nebuApi)
  }, [nebuApi]);

  useEffect(() => {
    console.log("API tou:", tourApi);
    setTourData(tourApi)
  }, [tourApi]);


  function openAddNebu() {
    setAddnebu(!addNebuState)
  }

  function openAddNebuDropDown() {
    setaddNebuDropdown(!addNebuDropDown)
  }

  function toggleAddTour() {
    setAddTourState(!addTourState)
  }

  function closePlaceInfoPanel() {
    setShowPlaceInfoPanel(false);
  }
  

  async function checkSession() {

    const { data: { user } ,error} = await supabase.auth.getUser()    

    if (error || user === null) {
      router.push("/home_unregistered")

    } else {
      let str = JSON.stringify(user.email)
      console.log("Session: "+JSON.stringify(user.app_metadata.provider))
      setProfileName(str.substring(1,3))
      console.log(profileName)
    }
  }
  
  async function checkProviderAccount(){
    const { data: { user } ,error} = await supabase.auth.getUser()
    if (error || user === null){
      console.log("Error when call checkProviderAccount function")
    }else if (user.app_metadata.provider==="email"){
      console.log("Login via Email")
    }else{
      let provider = user.app_metadata.provider
      let email = user.user_metadata.email
      console.log(provider+email)
      const response = await fetch("/api/auth/loginWithProvider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({provider, email}),
      })
      if(response.ok){
        console.log("Provider")
      }else{
        console.log("Error in checkProviderAccount")
      }
    }

  }

  function handleNebuClick(data){
    // setCurrentPosition([parseFloat(data.latitude), parseFloat(data.longitude)])      
    // setShowPlaceInfoPanel(true)
    // setNebu(data)
    router.push(`/NebuMapPage/${data.nebu_id}`)
  }

  function handleTourClick(data){
    router.push(`/TourMapPage/${data.tour_id}`)
  }

  const fetchImages = async () => {
    const response = await fetch(
      `/api/tour/image/getImagesFromDisplayName?display_name=${accountName}`
    );
    if (response.ok) {
      const data = await response.json();
      setImages(data.images);
      console.log("Fetched images: ", images);
    } else {
      console.error("Failed to fetch images");
    }
  };

  return (
      <div className="relative h-screen">
        <div className="absolute z-20 top-0 left-0 right-0 flex items-center justify-center md:justify-between px-4 pt-2">
          <div className="flex w-full justify-center md:justify-normal">
            <SearchBar text="Search" />            
          </div>
          <div className="flex">
            <div className="flex">
              <Button
                buttonStyle="btn bg-blue w-max md:block hidden mx-4 normal-case text-white border-none"
                label="Create Tour"
                onClick={toggleAddTour}
              ></Button>
              <Button
                buttonStyle="btn bg-blue w-max md:block hidden normal-case text-white border-none"
                label="Add Nebu"
                onClick={openAddNebuDropDown}
              ></Button>
            </div>
            <ProfileButton text={profileName} />
          </div>
        </div>
        <div className="absolute z-0 w-full h-full">
          <DynamicMap />
        </div>
        <AddNebu toggle={addNebuState} action={openAddNebu} />
        <AddTour toggle={addTourState} action={toggleAddTour}/>

        <div
          className={`fixed right-24 top-24 text-center text-white bg-blue flex flex-col rounded-lg font-bold items-center overflow-hidden ${
            addNebuDropDown ? "opacity-100" : "hidden"
          }`}
        >
          <Button
            buttonStyle="btn btn-primary bg-blue w-fit md:block hidden border-none"
            label="Current Location"
            onClick={openAddNebu}
          ></Button>
          <Button
            buttonStyle="btn btn-primary bg-blue w-fit md:block hidden mb-4 border-none px-5"
            label="Search Location"
          ></Button>
        </div>

        {/* <PlaceInfoPanel toggle={showPlaceInfoPanel} action={closePlaceInfoPanel} nebu={nebu} panelStyle="" 
          onRecommendTour={(selectedPlace) => {
            setRecommendedPlace(selectedPlace)
            setShowViewTourList(true)
          }}
        /> */}
        {/* {showViewTourList && (
          <ViewTourList
            toggle={showViewTourList}
            action={() => setShowViewTourList(false)}
            nebu={nebu}
          />
        )} */}


        <div
          className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-all ease-in duration-500 
          ${showPlaceInfoPanel ? "hidden" : "visible"} `}
        >
          <div className="relative flex flex-col rounded-lg shadow-md bg-dim-grey w-[23rem] lg:w-[35rem] font-bold text-black h-auto lg:h-[40rem] overflow-y-scroll">
            <div className="flex flex-col justify-start flex-shrink-0">
              <figure className="w-full h-[200px] rounded-t-md overflow-hidden">
                {" "}
                <img src={accountData[0]?.bg_picture_url ? accountData[0].bg_picture_url : altImage.src} alt="pic" className="w-full h-[200px]" />{" "}
              </figure>
              <button
                onClick={() => router.push("/home")}
                className="absolute top-0 right-0 mt-4 mr-4 z-10"
              >
                <Image src={whiteCloseIcon} alt="clsbtn" className="" width={20} />
              </button>
              <div className="pl-3 lg:px-8 flex flex-shrink-0">
                <figure className="w-full lg:w-[87px] z-10 lg:-mt-10 -mt-8">                  
                  <img src={accountData[0]?.profile_picture_url ? accountData[0].profile_picture_url : altImage.src} alt="pic" className="w-full rounded-full" />{" "}
                </figure>              
                <h3 className="text-2xl text-black ml-3 mt-1">{accountData[0]?.email}</h3>
              </div>
            </div>

            <div className="px-8 mt-6 flex flex-col gap-y-5">
              <p className="text-base font-medium">
              {accountData[0]?.bio}
              </p>
              <div className="text-base font-medium h-full">            
                <p className="font-semibold text-lg">Nebu</p>
                <div className="flex w-[20rem] lg:w-[30rem] overflow-x-auto h-full">
                  {Array.isArray(nebuData) && nebuData.map((data, index) => (
                    ((data.images[0] || data.images.length > 0) && 
                    <div key={index} className="lg:w-1/3 w-5/12 mt-2 mr-2 shrink-0 cursor-pointer"
                      onClick={() => handleNebuClick(data)}>
                      <img src={data.images[0] || data.images.length > 0 ? data.images[0] : altImage} alt="No images" className="h-[110px] text-black text-center rounded-md" />
                      {/* <figcaption className="text-white -mt-10 w-full text-right lg:-ml-3 -ml-1">
                        {data.title}
                      </figcaption> */}
                      <figcaption className="w-full text-black text-center">
                        {data.title}
                      </figcaption>
                    </div>)
                  ))}                  
                  
                </div>
                
              </div>
              <div className="text-base font-medium">
                <p className="font-semibold text-lg">Tour</p>
                {/* <div className="flex w-[20rem] lg:w-[30rem] h-[7rem] lg:h-[8rem] overflow-x-auto overflow-y-hidden mb-10"> */}
                <div className="flex w-[20rem] lg:w-[30rem] overflow-x-auto h-full">
                  {Array.isArray(tourData) && tourData.map((data, index) => (                     
                    <div key={index} className="lg:w-1/3 w-5/12 mt-2 mr-2 shrink-0 flex flex-col cursor-pointer"
                      onClick={() => handleTourClick(data)}>                      
                      {/* <img src={altImage.src} className="h-[100px] rounded-md"/> */}
                      <img src={images} className="h-[100px] rounded-md"/>
                      <div className="text-black w-full text-center">
                        {data.tour_name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
            
      </div>

    
  )
}
