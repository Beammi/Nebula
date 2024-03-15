//SearchOnMap.jsx
import SearchBar from "@/components/SearchBar";
import ProfileButton from "@/components/ProfileButton";
import DynamicMap from "@/components/DynamicMap";
import Button from "@/components/Button";
import AddNebu from "@/components/AddNebu";
import AddTour from "@/components/AddTour";
import AddPlaceModal from "@/components/AddPlaceModal";
import MoveablePin from "@/components/MoveablePin";
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import { useEffect } from "react";

export default function SearchOnMap() {
  const [addNebuState, setAddnebu] = useState(false);
  const [addNebuDropDown, setaddNebuDropdown] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [addTourState, setAddTourState] = useState(false);
  const router = useRouter();

  
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
      console.log("Session: " + JSON.stringify(user.app_metadata.provider));
      setProfileName(str.substring(1, 3));
      console.log(profileName);
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
  }, []);

  return (
    <>
      <div className="relative h-screen">
        <div className="absolute z-10 top-0 left-0 right-0 flex items-center justify-center md:justify-between px-4 pt-2">
          <div className="flex w-full justify-center md:justify-normal"></div>
        </div>
        <div className="absolute z-0 w-full h-full">
          <DynamicMap />
        </div>
      </div>
      <MoveablePin />
    </>
  );
}
