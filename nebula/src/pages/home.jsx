import SearchBar from "@/components/SearchBar";
import ProfileButton from "@/components/ProfileButton";
import DynamicMap from "@/components/DynamicMap";
import Button from "@/components/Button"
import AddNebu from "@/components/AddNebu"
import { useState } from "react";

export default function Home() {

  const [addNebuState, setAddnebu] = useState(false);

  function openAddNebu(){
    setAddnebu(!addNebuState)
  }

  return (
    <div className="relative h-screen">
      <div className="absolute z-10 top-0 left-0 right-0 flex items-center justify-between p-4">
        <div className="flex">
          <SearchBar text="Search" />
          <Button buttonStyle="btn btn-primary bg-yellow w-fit md:block hidden mx-2" label="Cafe with wifi"></Button>
          <Button buttonStyle="btn btn-primary bg-yellow w-fit md:block hidden" label="Restaurant"></Button>
        </div>
        <div className="flex">
          <div className="flex">
            <Button buttonStyle="btn btn-primary bg-blue w-fit md:block hidden mx-2" label="Create Tour"></Button>
            <Button buttonStyle="btn btn-primary bg-blue w-fit md:block hidden" label="Add Nebu" onClick={openAddNebu}></Button>
          </div>
          <ProfileButton text="NL"/>
        </div>
        {/*
        <SearchBar text="Search" />
        <ProfileButton text="NL"/>
        */}
      </div>
      <div className="absolute z-0 w-full h-full">
        <DynamicMap />
      </div>
      <AddNebu toggle={addNebuState} action={openAddNebu} />
    </div>
  );
}