//SearchOnMap.jsx
import SearchBar from "@/components/SearchBar";
import ProfileButton from "@/components/ProfileButton";
import DynamicMap from "@/components/map/DynamicMap";
import DynamicMapForSearchLoaction from "@/components/map/DynamicMapForSearchLoaction"
import Button from "@/components/Button";
import AddNebu from "@/components/nebu/AddNebu";
import AddTour from "@/components/tour/AddTour";
import AddPlaceModal from "@/components/tour/AddPlaceModal";
import MoveablePin from "@/components/map/MoveablePin";
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import { useEffect } from "react";
import { useSearchParams } from 'next/navigation'

export default function SearchOnMap() {
  const [addNebuState, setAddnebu] = useState(false);
  const [addNebuDropDown, setaddNebuDropdown] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [addTourState, setAddTourState] = useState(false);
  const router = useRouter();
  const [context, setContext] = useState(""); // Default context
  const queryContext = router.query.context;

  async function checkSession() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    // console.log(JSON.stringify(user))

    if (error || user === null) {
      router.push("/home_unregistered");
    } else {
      let str = JSON.stringify(user.email);
      // console.log("Session: " + JSON.stringify(user.app_metadata.provider));
      setProfileName(str.substring(1, 3));
      // console.log(profileName);
    }
  }

  async function checkProviderAccount() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error || user === null) {
      console.log("Error when call checkProviderAccount function");
    } else if (user.app_metadata.provider === "email") {
      console.log("Login via Email");
    } else {
      let provider = user.app_metadata.provider;
      let email = user.user_metadata.email;
      console.log(provider + email);
      const response = await fetch("/api/auth/loginWithProvider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, email }),
      });
      if (response.ok) {
        console.log("Provider");
      } else {
        console.log("Error in checkProviderAccount");
      }
    }
  }

  useEffect(() => {
    checkSession();
    checkProviderAccount();
    console.log("context ",queryContext)
  }, []);

  return (
    <>
      <div className="relative h-screen">
        <div className="absolute z-10 top-0 left-0 right-0 flex items-center justify-center md:justify-between px-4 pt-2">
          <div className="flex w-full justify-center md:justify-normal"></div>
        </div>
        <div className="absolute z-0 w-full h-full">
          <DynamicMapForSearchLoaction context={queryContext}/>
        </div>
      </div>
      <MoveablePin />
    </>
  );
}
