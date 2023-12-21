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
            buttonStyle="btn bg-yellow md:block hidden mx-2 border-none text-white"
            label="Cafewithwifi"
          ></Button>
          <Button
            buttonStyle="btn bg-yellow md:block hidden border-none text-white"
            label="Restaurant"
          ></Button>
        </div>
        <div className="flex">
          <div className="flex">
            <Button
              buttonStyle="btn bg-blue md:block hidden mx-2 text-white border-none"
              label="Create Tour"
            ></Button>
            <Button
              buttonStyle="btn text-white bg-blue md:block hidden border-none"
              label="Add Nebu"
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
      <div className={`fixed right-24 top-24 text-center text-white bg-blue flex flex-col rounded-lg font-bold items-center overflow-hidden ${addNebuDropDown ? 'opacity-100':'hidden'}`}>
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
    </div>
  );
}
