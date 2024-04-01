import closeIcon from "../../public/images/close.png";
import Image from "next/image";
import Button from "../Button";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router"

export default function AddPlaceModal(props) {
  const { toggle, action } = props;
  const isOpen = toggle;
  const router = useRouter()


  function navigateMoveablePin(){
    router.push("/SearchOnMap")
  }
  const navigateToAddPlace = () => {
    router.push("/SearchOnMap?context=place");
  };
  
  const navigateToAddWaypoint = () => {
    router.push("/SearchOnMap?context=waypoint");
  };
  return (
      <div
        className={`ease-in duration-300 ${
          isOpen ? "visible opacity-100 drop-shadow-2xl" : "hidden invisible opacity-0"
        }`}
      >
        <div className="flex flex-col rounded-lg text-black ml-2 bg-dark-grey">
          <Button
            buttonStyle=" bg-dark-grey p-2 py-0 outline-none w-full"
            type="button"
            label="Add place"
            onClick={() => {
              action();
              navigateToAddPlace();
            }}
          ></Button>
          <Button
            buttonStyle=" bg-dark-grey p-2 pb-4 outline-none w-full"
            type="button"
            label="Add waypoint"
            onClick={() => {
              action();
              navigateToAddWaypoint();
            }}
          ></Button>
        </div>
      </div>
  );
}
