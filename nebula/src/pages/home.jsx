import SearchBar from "@/components/SearchBar"
import ProfileButton from "@/components/ProfileButton"
import DynamicMap from "@/components/map/DynamicMap"
import Button from "@/components/Button"
import AddNebu from "@/components/nebu/AddNebu"
import AddTour from "@/components/tour/AddTour"
import AddPlaceModal from "@/components/tour/AddPlaceModal"
import MoveablePin from "@/components/map/MoveablePin"
import { useState } from "react"
import { useRouter } from "next/router"
import { supabase } from "../lib/supabaseClient"
import { useEffect } from "react"


export default function Home() {
  const [addNebuState, setAddnebu] = useState(false)
  const [addNebuDropDown, setaddNebuDropdown] = useState(false)
  const [profileName,setProfileName] = useState("")
  const [addTourState, setAddTourState] = useState(false)
  const router = useRouter()
  const [selectedNebuId, setSelectedNebuId] = useState(null);

  // Other states and functions...

  useEffect(() => {
    // When the component mounts or the URL query changes
    const { nebuId } = router.query;

    if (nebuId) {
      // Found a nebuId query parameter, update state to reflect it
      setSelectedNebuId(nebuId);
      // Optional: Further actions, like opening the PlaceInfoPanel or fetching Nebu details
    }
  }, [router.query]);
  async function checkSession() {

    const { data: { user } ,error} = await supabase.auth.getUser()
    // console.log(JSON.stringify(user))

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

  useEffect(() => {
    checkSession()
    checkProviderAccount()

    // Check if we should open the AddTour modal based on the query parameter
    if (router.query.addTour === 'true') {
      setAddTourState(true);
    }

    // Clean up the URL by removing the query parameter (optional)
    const pathname = router.pathname;
    const asPath = router.asPath.split('?')[0]; // Remove query params
    router.replace({ pathname, query: {} }, asPath, { shallow: true });
  }, [router.query.addTour]);
  function openAddNebu() {
    setAddnebu(!addNebuState)
  }

  function openAddNebuDropDown() {
    setaddNebuDropdown(!addNebuDropDown)
  }

  function toggleAddTour() {
    setAddTourState(!addTourState)
  }

  return (
    <div className="relative h-screen">
      <div className="absolute z-10 top-0 left-0 right-0 flex items-center justify-center md:justify-between px-4 pt-2">
        <div className="flex w-full justify-center md:justify-normal">
          <SearchBar text="Search" />
          {/* <Button
            buttonStyle="btn bg-yellow hover:bg-dark-grey w-max md:block hidden ml-14 lg:ml-16 border-none text-black normal-case"
            label="Café with wifi"
          ></Button>
          <Button
            buttonStyle="btn bg-yellow hover:bg-dark-grey w-max md:block hidden ml-6 border-none text-black normal-case"
            label="Restaurant"
          ></Button> */}
        </div>
        <div className="flex md:relative absolute md:top-0 md:left-0 sm:left-24 left-0 top-20">
          <div className="flex gap-2 md:gap-6 ml-4 md:ml-0">
            <Button
              buttonStyle="px-4 py-2 lg:px-4 lg:py-4 w-max bg-white text-blue text-lg font-medium md:bg-blue md:text-white rounded-lg normal-case border-0 text-sm cursor-pointer md:block shadow-md"
              label="Create Tour"
              onClick={toggleAddTour}
            ></Button>
            <Button
              buttonStyle="px-4 py-2 lg:px-4 lg:py-4 w-max bg-white text-blue text-lg font-medium md:bg-blue md:text-white rounded-lg normal-case border-0 text-sm cursor-pointer md:block shadow-md"
              label="Add Nebu"
              onClick={openAddNebu}
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
      {/* <div
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
      </div> */}
    </div>
  );
}
