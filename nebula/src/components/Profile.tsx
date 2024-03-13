import Button from "./Button"
import React, { useState } from "react"
import ImageUpload from "./ImageUpload"
import TimeLimitBox from "./TimeLimitBox"
import Image from "next/image"
import closeIcon from "../../public/images/close.png"
import smallHashtag from "../../public/images/smallHashtag_blue.png"
import filterIcon from "../../public/images/filter-icon.png"
import skyPic from "../../public/images/skyPic.png"
import profilePic from "../../public/images/lionelPic.png"
import holmesPic from "../../public/images/holmesPic.png"
import ferryWheelPic from "../../public/images/ferryWheelPic.png"
import whiteCloseIcon from "../../public/images/whiteCloseIcon.png"

import Link from "next/link"
// import smallHashtag from "../../public/images/smallHashtag.png";
import NebuTag from "./NebuTag"

export default function Profile(props) {
  const state = props.toggle
  const action = props.action
  const accountName = props.accountName
  const [showEditable, setShowEditable] = useState(false)

  function saveProfile(){
    
  }

  return (
    <div
      className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-all ease-in duration-500 ${
        state
          ? "visible opacity-100 drop-shadow-2xl"
          : "rounded-sm invisible opacity-0"
      } `}
    >
      <div className="relative flex flex-col rounded-lg shadow-md bg-dim-grey w-[23rem] lg:w-[35rem] font-bold text-black h-auto lg:h-[38rem] overflow-y-scroll items-stretch">
        <div className="flex flex-col justify-start">
          <figure className="w-full">
            {" "}
            <Image src={skyPic} alt="pic" className="w-full" />{" "}
          </figure>
          <button
            onClick={action}
            className="absolute top-0 right-0 mt-4 mr-4 z-10"
          >
            <Image src={whiteCloseIcon} alt="clsbtn" className="" width={20} />
          </button>
          <div className="px-8 flex">
            <figure className="lg:w-1/6 w-[23%] z-10 lg:-mt-10 -mt-8">
              {" "}
              <Image src={profilePic} alt="pic" className="w-full" />{" "}
            </figure>
            <h3 className="text-2xl text-black ml-3 mt-1">{accountName}</h3>
          </div>
        </div>

        <div className="lg:pl-14 lg:pr-16 px-7 mt-6 grid grid-cols-2 gap-y-5 items-center ">
            <p className="text-base font-medium w-fit">First name</p>
            <input type="text" placeholder="Type here" className="input input-bordered bg-grey shadow font-medium" />
            <p className="text-base font-medium w-fit">Last name</p>
            <input type="text" placeholder="Type here" className="input input-bordered bg-grey shadow font-medium" />
            <p className="text-base font-medium w-fit">Bio</p>
            <textarea className="textarea textarea-md w-full bg-grey shadow text-base font-medium" placeholder="Type here"></textarea>   

        </div>

        
        { showEditable ?
          <div className="flex px-7 mb-5 lg:mb-0 lg:px-10">
            <button className="mr-auto justify-self-start rounded-lg mt-11 py-2 px-4 normal-case font-normal text-black bg-dark-grey" onClick={() => setShowEditable(!showEditable)}>Cancel</button>
            <button className="ml-auto rounded-lg mt-11 py-2 px-4 normal-case font-normal text-white bg-red" onClick={() => saveProfile()}>Save</button>
          </div>
          :          
          <button className="ml-auto rounded-lg py-2 px-4 normal-case font-normal text-white self-center mr-5 lg:mt-11 my-7 text-lg bg-blue shadow" onClick={() => setShowEditable(!showEditable)}>Edit profile</button>
        }

        


      </div>
    </div>
  )
}
