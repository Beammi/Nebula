import SearchBar from "@/components/SearchBar";
import ProfileButton from "@/components/ProfileButton";
import DynamicMap from "@/components/DynamicMap";
import Button from "@/components/Button";
import AddNebu from "@/components/AddNebu";
import { useState } from "react";

export default function Home() {
  const [addNebuState, setAddnebu] = useState(false);
  const [addNebuDropDown, setaddNebuDropdown] = useState(false);

  function openAddNebu() {
    setAddnebu(!addNebuState);
  }

  function openAddNebuDropDown(){
    setaddNebuDropdown(!addNebuDropDown);
  }

  return (
    <div className="relative h-screen">
      <div className="absolute z-10 top-0 left-0 right-0 flex items-center justify-center md:justify-between px-4 pt-2">
        <div className="flex w-full justify-center md:justify-normal">
          <SearchBar text="Search" />
          <Button
            buttonStyle="btn btn-primary bg-yellow w-fit md:block hidden mx-2 border-none"
            label="Cafewithwifi"
          ></Button>
          <Button
            buttonStyle="btn btn-primary bg-yellow w-fit md:block hidden border-none"
            label="Restaurant"
          ></Button>
        </div>
        <div className="flex">
          <div className="flex">
            <Button
              buttonStyle="btn btn-primary bg-blue w-fit md:block hidden mx-2"
              label="CreateTour"
            ></Button>
            <Button
              buttonStyle="btn btn-primary bg-blue w-fit md:block hidden"
              label="AddNebu"
              onClick={openAddNebuDropDown}
            ></Button>
          </div>
          <ProfileButton text="NL" />
        </div>
      </div>
      <div className="absolute z-0 w-full h-full">
        <DynamicMap />
      </div>
      <AddNebu toggle={addNebuState} action={openAddNebu} />
    </div>
  );
}
