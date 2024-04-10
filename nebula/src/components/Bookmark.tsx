import Button from "./Button"
import React, { useState, useEffect } from "react"
import ImageUpload from "./ImageUpload"
import TimeLimitBox from "./TimeLimitBox"
import Image from "next/image"
import closeIcon from "../../public/images/close.png"
import smallHashtag from "../../public/images/smallHashtag_blue.png"
import filterIcon from "../../public/images/filter-icon.png"
import marketPic from "../../public/images/marketPic.png"
import bigBenPic from "../../public/images/bigBenPic.png"
import altImage from "../../public/images/altImage.png"

import yellowPin from "../../public/images/yellowPin.png"
import yellowFlag from "../../public/images/yellowFlag.png"
import blueBookmark from "../../public/images/blueBookmark.png"
import redCloseIcon from "../../public/images/redCloseIcon.png"
import filledoutBlueBookmark from "../../public/images/filledoutBlueBookmark.png"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/router"

import Link from "next/link"

export default function Bookmark(props) {
  const state = props.toggle
  const action = props.action
  const tagName = props.tagName
  const [data, setData] = useState([]) // Initialize data as empty array
  const [checkedStatus, setCheckedStatus] = useState({})
  const [showDeletePopUp, setShowDeletePopUp] = useState(false)
  const [email, setEmail] = useState("")
  const [provider, setProvider] = useState("")
  const [selectedBookmarkId, setSelectedBookmarkId] = useState(null)
  const router = useRouter()
  async function getEmail() {
    console.log("Pass getEmail()")

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    // console.log(JSON.stringify(user))

    if (error || user === null) {
      console.log("Error in getUser")
      return
    }
    const userEmail =
      user.app_metadata.provider === "email"
        ? user.email
        : user.user_metadata.email
    const userProvider = user.app_metadata.provider || ""
    setEmail(userEmail)
    setProvider(userProvider)
    fetchData(userEmail, userProvider)
  }
  const fetchData = async (email, provider) => {
    const url = `/api/bookmark/getBookmarkFromUser?email=${encodeURIComponent(
      email
    )}&provider=${encodeURIComponent(provider)}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      setData(data)
      console.log("Bookmark:", data)
      // console.log(data[1].tags)
      setCheckedStatus(new Array(data.length).fill(false)) // Initialize checkedStatus based on fetched data
    } catch (error) {
      console.error("Fetch error:", error)
    }
  }
  const deleteBookmark = async (bookmarkId) => {
    try {
      const response = await fetch("/api/bookmark/deleteBookmark", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, bookmarkId: bookmarkId }), // Ensure you have the correct user ID and bookmark ID
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      console.log(data.message) // "Bookmark deleted successfully"
      fetchData(email,provider)
      alert(data.message)
      // Optionally, refresh your bookmarks list or update UI accordingly
    } catch (error) {
      console.error("Error deleting bookmark:", error)
    }
  }

  useEffect(() => {
    getEmail()
  }, [])

  async function handleClickEmail(email){
    const response = await fetch(`/api/search/userprofile/getDisplayNameFromEmail?email=${email}`)
    const data = await response.json()
    
    if (data[0]) { 
      router.push(`/userprofile/${data[0]}`)
    } else {
      console.error("No display name");
    }

  }

  async function handleClickCard(data){
    if(data.type === "nebu"){
      router.push(`/NebuMapPage/${data.normal_id}`)
    }
    else if(data.type === "tour"){
      router.push(`/TourMapPage/${data.normal_id}`)
    }
    
  }

  return (
    <div
      className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-all ease-in duration-500 ${
        state
          ? "visible opacity-100 drop-shadow-2xl"
          : "rounded-sm invisible opacity-0"
      } `}
    >
      <div className="rounded-lg shadow-md bg-dim-grey w-[23rem] lg:w-[35rem] h-auto lg:h-[40rem] font-bold text-black p-7">
        <div className="flex my-2 items-center justify-between">
          <div className="flex gap-x-5 ml-3 items-center">
            <figure className="">
              {" "}
              <Image src={filledoutBlueBookmark} alt="pic" width={27} />{" "}
            </figure>
            <h3 className="text-xl lg:text-2xl text-black flex gap-x-2">
              Bookmark items
            </h3>
          </div>
          {/* <div className="select-container ml-auto bg-white relative rounded-lg mr-3">
            <select className="select bg-white rounded-2xl select-sm">              
              <option>Newest</option>
              <option>High Rated</option>
              <option>Oldest</option>
            </select>
            <figure className="select-icon absolute right-3 top-1/2 transform -translate-y-1/2">
              <Image src={filterIcon} alt="pic" className="" />
            </figure>
          </div> */}
          <button onClick={action}>
            <Image
              src={closeIcon}
              alt="clsbtn"
              className="ml-auto"
              width={20}
            />
          </button>
        </div>

        <div className="w-full h-[3px] bg-grey "></div>

        <div className="text-black mt-5 w-fit h-[500px] overflow-y-scroll">
          {data.map((data, index) => (
            <div
              key={index}
              className="card lg:card-side bg-white shadow-md w-full px-4 lg:py-0 py-4 mb-4 flex flex-col lg:flex-row lg:items-start cursor-pointer"
              onClick={() => handleClickCard(data)}>
              {data.images && data.images.length > 0 ? (
                <figure className="w-full lg:w-[37%] flex-shrink-0 lg:mt-10">
                  <img
                    src={data.images[0]}
                    alt="nebu-picture"
                    className=" lg:h-auto"
                  />
                </figure>
              ) : (
                <figure className="w-full lg:w-[37%] flex-shrink-0 lg:mt-10">
                  <Image src={altImage} alt="pic" className=" lg:h-auto" />
                </figure>
              )}

              <div className="card-body flex flex-col justify-between">
                {data.type === "nebu" && (
                  <h2 className="card-title w-full lg:w-full flex flex-col lg:flex-row flex-wrap">
                    <div className="flex w-full gap-3 flex-col lg:flex-row lg:place-items-start">
                      <figure className="lg:w-[10%] mt-1">
                        <Image src={yellowPin} alt="pic" />
                      </figure>
                      <p className="w-full text-center lg:text-start">
                        {data.title}
                      </p>
                      <figure
                        className="lg:w-[10%] lg:ml-auto mt-1.5 cursor-pointer"
                        onClick={() => {
                          setShowDeletePopUp(true)
                          setSelectedBookmarkId(data.bookmark_id)
                        }}
                      >
                        <Image src={redCloseIcon} alt="pic" />
                      </figure>
                    </div>
                    <p className="font-normal text-base text-black-grey w-full text-center lg:text-start cursor-pointer hover:underline"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClickEmail(data.creator_email)
                      }}>
                      added by {data.creator_email}
                    </p>
                  </h2>
                )}
                {data.type === "tour" && (
                  <h2 className="card-title w-full lg:w-full flex flex-col lg:flex-row flex-wrap">
                    <div className="flex w-full gap-3 flex-col lg:flex-row">
                      <figure className="lg:w-[10%]">
                        <Image src={yellowFlag} alt="pic" />
                      </figure>
                      <p className="w-full text-center lg:text-start">
                        {data.title}
                      </p>
                      <figure
                        className="lg:w-[10%] lg:ml-auto mt-1.5 cursor-pointer"
                        onClick={() => {
                          setShowDeletePopUp(true)
                          setSelectedBookmarkId(data.bookmark_id)
                        }}
                      >
                        <Image src={redCloseIcon} alt="pic" />
                      </figure>
                    </div>
                    <p className="font-normal text-base text-black-grey w-full text-center lg:text-start cursor-pointer hover:underline"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClickEmail(data.creator_email)}}>
                      added by {data.creator_email}
                    </p>
                  </h2>
                )}
                <p className="font-medium">{data.place_name}</p>
                <p className="font-normal overflow-hidden lg:h-auto line-clamp-2 lg:line-clamp-3">
                  {data.description}
                </p>
                <div className="flex flex-row mt-1">
                  <div className="flex gap-2 flex-wrap">
                    <button className="px-2 py-1 bg-yellow text-white rounded-lg normal-case border-0 text-sm cursor-pointer"
                      onClick={(event) => {
                        event.stopPropagation();
                        router.push(`/tag/${data.official_tag}`)}}>
                      #{data.official_tag}
                    </button>
                    {data.tags && data.tags.length > 0 ? (
                      data.tags.map((tag, tagIndex) => (
                        <button
                          key={tagIndex}
                          className="px-2 py-1 bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer"
                          onClick={(event) => {
                            event.stopPropagation();
                            router.push(`/tag/${tag}`)}}
                        >
                          #{tag}
                        </button>
                      ))
                    ) : (
                      <p className="text-xs text-grey">No additional tags</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-opacity ease-in duration-200  ${
          showDeletePopUp
            ? "visible opacity-100 shadow-md bg-white border-1 border-black w-[20rem] lg:w-[35rem] border-2"
            : "rounded-sm invisible opacity-0"
        } `}
      >
        <div className="flex flex-col p-7">
          <p className="text-lg text-black font-medium">
            Do you want to confirm to delete your Bookmark?
          </p>
          <div className="flex px-10">
            <button
              className="mr-auto justify-self-start rounded-lg mt-16 py-2 px-4 normal-case font-normal text-black bg-dark-grey"
              onClick={() => {
                setShowDeletePopUp(!showDeletePopUp)
              }}
            >
              Cancel
            </button>
            <button
              className="ml-auto rounded-lg mt-16 py-2 px-4 normal-case font-normal text-white bg-red"
              onClick={() => {
                deleteBookmark(selectedBookmarkId)
                setShowDeletePopUp(!showDeletePopUp)
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
