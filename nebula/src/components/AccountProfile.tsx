import Button from "./Button"
import React, { useEffect, useState } from "react"
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
import altImage from "../../public/images/altImage.png"

import Link from "next/link"
// import smallHashtag from "../../public/images/smallHashtag.png";
import NebuTag from "./NebuTag"

export default function AccountProfile(props) {
  const accountProfileState = props.toggle
  const action = props.action
  const accountName = props.accountName
  const [accountData, setAccountData] = useState([])  

  console.log("A: ", accountName);

  useEffect(() => {
    fetchAccountProfile()
  }, [accountName])

  async function fetchAccountProfile(){
    const url = `/api/nebu/getUsersByDisplayName?searchKey=${accountName}`
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      // const data: string[] = await response.json(); // normal array same as write in api
      const data: string[][] = await response.json(); // normal array same as write in api
      setAccountData(data)
      console.log("acc data: ", accountData);
      // console.log("acc d2: ", accountData.map());
      
      

    } catch (error) {
      console.error("Fetch error:", error)
    }
  }
  

  return (
    <div
      className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-all ease-in duration-500 ${
        accountProfileState
          ? "visible opacity-100 drop-shadow-2xl"
          : "rounded-sm invisible opacity-0"
      } `}
    >
      <div className="relative flex flex-col rounded-lg shadow-md bg-dim-grey w-[23rem] lg:w-[35rem] font-bold text-black lg:h-[40rem] overflow-y-scroll">
        <div className="flex flex-col justify-start">
          <figure className="w-full h-[200px]">
            {" "}
            <img src={accountData[0].bg_picture_url ? accountData[0].bg_picture_url : altImage.src} alt="pic" className="w-full h-[200px]" />{" "}
          </figure>
          <button
            onClick={action}
            className="absolute top-0 right-0 mt-4 mr-4 z-10"
          >
            <Image src={whiteCloseIcon} alt="clsbtn" className="" width={20} />
          </button>
          <div className="pl-3 lg:px-8 flex">
            <figure className="lg:w-[87px] w-full z-10 lg:-mt-10 -mt-8">
              {" "}
              <img src={accountData[0].profile_picture_url ? accountData[0].profile_picture_url : altImage.src} alt="pic" className="w-full" />{" "}
            </figure>
            {/* <h3 className="text-2xl text-black ml-3 mt-1">{accountName}</h3> */}
            <h3 className="text-2xl text-black ml-3 mt-1">{accountData[0]?.email}</h3>
          </div>
        </div>

        <div className="px-8 mt-6 flex flex-col gap-y-5">
          <p className="text-base font-medium">
          {accountData[0]?.bio}
          </p>
          <div className="text-base font-medium h-full">            
            <p>Nebu</p>
            <div className="flex w-[20rem] lg:w-[30rem] h-[7rem] lg:h-[8rem] overflow-x-auto overflow-y-hidden">
              <div className="lg:w-1/3 w-5/12 mt-2 shrink-0">
                <Image src={ferryWheelPic} alt="pic" className="w-full" />
                <figcaption className="text-white -mt-10 w-full text-right lg:-ml-3 -ml-1">
                  Lancaster Hotel
                </figcaption>
              </div>
              <div className="lg:w-1/3 w-5/12 mt-2 shrink-0">
                <Image src={ferryWheelPic} alt="pic" className="w-full" />
                <figcaption className="text-white -mt-10 w-full text-right lg:-ml-3 -ml-1">
                  Lancaster Hotel
                </figcaption>
              </div>
              <div className="lg:w-1/3 w-5/12 mt-2 shrink-0">
                <Image src={ferryWheelPic} alt="pic" className="w-full" />
                <figcaption className="text-white -mt-10 w-full text-right lg:-ml-3 -ml-1">
                  Lancaster Hotel
                </figcaption>
              </div>
              <div className="lg:w-1/3 w-5/12 mt-2 shrink-0">
                <Image src={ferryWheelPic} alt="pic" className="w-full" />
                <figcaption className="text-white -mt-10 w-full text-right lg:-ml-3 -ml-1">
                  Lancaster Hotel
                </figcaption>
              </div>
              <div className="lg:w-1/3 w-5/12 mt-2 shrink-0">
                <Image src={ferryWheelPic} alt="pic" className="w-full" />
                <figcaption className="text-white -mt-10 w-full text-right lg:-ml-3 -ml-1">
                  Lancaster Hotel
                </figcaption>
              </div>
            </div>
            
          </div>
          <div className="text-base font-medium">
            <p>Tour</p>
            <div className="flex w-[20rem] lg:w-[30rem] h-[7rem] lg:h-[8rem] overflow-x-auto overflow-y-hidden">
                <div className="lg:w-1/3 w-5/12 mt-2 shrink-0">
                  <Image src={holmesPic} alt="pic" className="w-full" />
                  <figcaption className="text-white -mt-10 w-full text-right lg:-ml-3 -ml-1">
                    Holmes Museum
                  </figcaption>
                </div>
                <div className="lg:w-1/3 w-5/12 mt-2 shrink-0">
                  <Image src={holmesPic} alt="pic" className="w-full" />
                  <figcaption className="text-white -mt-10 w-full text-right lg:-ml-3 -ml-1">
                  Holmes Museum
                  </figcaption>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
