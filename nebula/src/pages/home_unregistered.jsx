import SearchBar from "@/components/SearchBar"
import ProfileButton from "@/components/ProfileButton"
import DynamicMap from "@/components/map/DynamicMap"
import Button from "@/components/Button"
import AddNebu from "@/components/nebu/AddNebu"
import { useState } from "react"
import UnregisteredProfileButton from "@/components/UnregisteredProfileButton"
export default function HomeUnregistered() {

  return (
    <div className="relative h-screen">
      <div className="absolute z-10 top-0 left-0 right-0 flex items-center justify-center md:justify-between px-4 pt-2">
        <div className="flex w-full justify-center md:justify-normal">
          <SearchBar text="Search" />
          {/* <Button
            buttonStyle="btn bg-yellow hover:bg-dark-grey w-max md:block hidden mx-8 border-none text-black normal-case"
            label="Café with wifi"
          ></Button>
          <Button
            buttonStyle="btn bg-yellow hover:bg-dark-grey w-max md:block hidden border-none text-black normal-case"
            label="Restaurant"
          ></Button> */}
        </div>
        <div className="flex">
          {/* <button className="btn btn-circle bg-black-grey"></button> */}
          <UnregisteredProfileButton></UnregisteredProfileButton>
        </div>
      </div>
      <div className="absolute z-0 w-full h-full">
        <DynamicMap />
      </div>
      
    </div>
  )
}
