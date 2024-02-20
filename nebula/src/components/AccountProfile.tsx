import Button from "./Button";
import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import TimeLimitBox from "./TimeLimitBox";
import Image from "next/image";
import closeIcon from "../../public/images/close.png";
import smallHashtag from "../../public/images/smallHashtag_blue.png";
import filterIcon from "../../public/images/filter-icon.png"
import skyPic from "../../public/images/skyPic.png"
import profilePic from "../../public/images/lionelPic.png"
import holmesPic from "../../public/images/holmesPic.png"
import ferryWheelPic from "../../public/images/ferryWheelPic.png"
import whiteCloseIcon from "../../public/images/whiteCloseIcon.png"


import Link from 'next/link'
// import smallHashtag from "../../public/images/smallHashtag.png";
import NebuTag from "./NebuTag";

export default function AccountProfile(props) {
  const accountProfileState = props.toggle;
  const action = props.action;
  const accountName = props.accountName;

  return (
    <div
      className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-all ease-in duration-500 ${
        accountProfileState
          ? "visible opacity-100 drop-shadow-2xl"
          : "rounded-sm invisible opacity-0"
      } `}
    >
      <div className="relative flex flex-col rounded-lg shadow-md bg-dim-grey lg:w-[35rem] font-bold text-black lg:h-[40rem] overflow-y-scroll">
        <div className="flex flex-col justify-start">
          <figure className="w-full"> <Image src={skyPic} alt="pic" className="w-full"/> </figure>
          <button onClick={action} className="absolute top-0 right-0 mt-4 mr-4 z-10">
            <Image
              src={whiteCloseIcon}
              alt="clsbtn"
              className=""
              width={20}
            />
          </button>
          <div className="px-8 flex">
            <figure className="w-1/6 z-10 -mt-10"> <Image src={profilePic} alt="pic" className="w-full"/> </figure>
            <h3 className="text-2xl text-black ml-3 mt-1">{accountName}</h3>
          </div>          
        </div>        

        <div className="px-8 mt-6 flex flex-col gap-y-5">
          <p className="text-base font-medium">Bio: A software develop who Love Travel, Enjoy new food</p>
          <div className="text-base font-medium">
            Nebu
            <figure className="w-1/3 mt-2"> <Image src={ferryWheelPic} alt="pic" className="w-full"/> 
              <div className="text-white -mt-10 w-full text-right -ml-3">Lancaster Hotel</div>
            </figure>
          </div>
          <div className="text-base font-medium">
            Tour
            <figure className="w-1/3 mt-2 "> <Image src={holmesPic} alt="pic" className="w-full"/> 
              <div className="text-white -mt-10 w-full text-right -ml-3">Holmes Museum</div>
            </figure>
            
          </div>
        </div>

        
      </div>
    </div>
  );
}
