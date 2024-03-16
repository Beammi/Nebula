import Button from "./Button"
import React, { useState, useEffect } from "react"
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
import altImage from "../../public/images/altImage.png"
// import closeIcon from "../../public/images/close.png"
import { supabase } from "@/lib/supabaseClient"

import Link from "next/link"
// import smallHashtag from "../../public/images/smallHashtag.png";
import NebuTag from "./NebuTag"

export default function MyNebu(props) {
  const mockData = [
    {
      title: "Big Ben",
      description:
        "A must destination in UK. Coming in daytime makes your picture much better while the image at night also looks exceptional. This is worth it, there are many attractions near this place. You should come before you die. I recommend it!!",
    },
    {
      title: "London Stadium",
      description:
        "A must destination in UK. Coming in daytime makes your picture much better while the image at night also looks exceptional. This is worth it, there are many attractions near this place. You should come before you die. I recommend it!!",
    },
    {
      title: "Sherlock homes museum",
      description:
        "A must destination in UK. Coming in daytime makes your picture much better while the image at night also looks exceptional. This is worth it, there are many attractions near this place. You should come before you die. I recommend it!!",
    },
  ]
  const accountProfileState = props.toggle
  const action = props.action
  const accountName = props.accountName
  const [showInfo, setShowInfo] = useState([false])
  const [showAllSelectBox, setShowAllSelectBox] = useState(false)
  const [data, setData] = useState([]) // Initialize data as empty array
  const [checkedStatus, setCheckedStatus] = useState({})
  const [showDeletePopUp, setShowDeletePopUp] = useState(false)
  const [email,setEmail] = useState("")
  const [provider,setProvider] = useState("")
  // console.log("This is account name: ", accountName);

  function handleCheckboxClick(nebu_id) {
    setCheckedStatus((prevStatus) => ({
      ...prevStatus,
      [nebu_id]: !prevStatus[nebu_id],
    }))
  }

  function handleDeleteData() {
    const updatedData = data.filter((_, i) => !checkedStatus[i]) // if checked(= true), we will not count so false
    setData(updatedData) // Update the data array
    setShowDeletePopUp(false)
    setCheckedStatus([false])
  }
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
    const url = `/api/nebu/getNebuFromUser?email=${encodeURIComponent(
      email
    )}&provider=${encodeURIComponent(provider)}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      setData(data)
      console.log(data)
      // console.log(data[1].tags)
      setCheckedStatus(new Array(data.length).fill(false)) // Initialize checkedStatus based on fetched data
    } catch (error) {
      console.error("Fetch error:", error)
    }
  }
  function collectSelectedNebuIds() {
    return Object.entries(checkedStatus).reduce((acc, [id, isChecked]) => {
      if (isChecked) acc.push(id)
      return acc
    }, [])
  }

  async function deleteSelectedNebu() {
    const selectedNebuIds = collectSelectedNebuIds()

    try {
      const response = await fetch("/api/nebu/deleteNebu", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nebu_ids: selectedNebuIds }),
      })

      if (!response.ok) throw new Error("Failed to delete Nebu posts")

      // Handle successful deletion
      // For example, refetching the posts or updating the UI accordingly
      console.log("Deleted successfully")
      setShowDeletePopUp(false)
      setCheckedStatus([false])
      fetchData(email,provider)
    } catch (error) {
      console.error("Error deleting Nebu posts:", error)
    }
  }

  useEffect(() => {
    getEmail()
  }, []) // Empty dependency array means this effect runs once on mount
  return (
    <div
      className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-all ease-in duration-500 ${
        accountProfileState
          ? "visible opacity-100 drop-shadow-2xl"
          : "rounded-sm invisible opacity-0"
      } `}
    >
      <div className="relative flex flex-col rounded-lg shadow-md bg-dim-grey w-[20rem] lg:w-[35rem] font-bold text-black h-[32rem] lg:h-[40rem] overflow-y-scroll">
        <div className="flex flex-col justify-start">
          <button
            onClick={action}
            className="absolute top-0 right-0 mt-4 mr-4 z-10"
          >
            <Image src={closeIcon} alt="clsbtn" className="" width={20} />
          </button>
        </div>
        <div className="flex flex-col mt-12 px-10 pb-5">
          <h2 className="text-2xl text-center">My Nebu</h2>
          {/* {data.map((data, index) => (
                <>
                    <div className="flex flex-row text-white font-normal py-1 mt-3 bg-blue rounded-lg w-full drop-shadow-md">
                      <p className="w-full pl-5 cursor-pointer"
                          onClick={() => {
                            const updatedShowInfo = [...showInfo]; // Make a copy of the showInfo array
                            updatedShowInfo[index] = !updatedShowInfo[index]; // Toggle the value at the specific index
                            setShowInfo(updatedShowInfo); // Update the state with the modified array
                        }}>{data.title}</p>            
                      <input type="checkbox" 
                        className={`${showAllSelectBox ? "visible opacity-100" : "invisible opacity-0"} checkbox ml-auto mr-5 checkbox-accent border-[1.5px] border-dashed border-white`} 
                        checked={checkedStatus[index]} // Set checked status based on the state
                        onChange={() => handleCheckboxClick(index)}/>
                    </div>

                    <div className={`transition-all ease-in duration-00 ${showInfo[index] ? 'h-auto opacity-100' : 'h-0 opacity-0'}`}>
                        { showInfo[index] && (
                            <div className="flex flex-col bg-white mt-3 pl-5 py-2 pr-2 rounded-lg gap-y-3 drop-shadow-md">
                                <h3 className="text-md mt-2">{data.title}</h3>
                                <div className='flex flex-row lg:flex-row mt-1 gap-2 flex-wrap lg:w-auto'>
                                    <Link href="https://www.google.com/" className="px-1 lg:px-2 py-1 w-fit bg-yellow text-white rounded-lg normal-case border-0 text-sm cursor-pointer">#tourist_attraction</Link>
                                    <Link href="https://www.google.com/" className=" px-1 lg:px-2 py-1 w-fit bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer">#bridge</Link>
                                    <Link href="https://www.google.com/" className=" px-1 lg:px-2 py-1 w-fit bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer">#natLikes</Link>
                                </div>
                                <p className="font-normal">{data.description}</p>
                                <div className="flex gap-x-2 w-2/3 overflow-x-scroll">
                                    <figure> <Image alt="pic" src={ferryWheelPic}/> </figure>
                                    <figure> <Image alt="pic" src={holmesPic}/> </figure>
                                </div>
                                <button className="rounded-lg py-2 px-4 normal-case font-normal text-white ml-auto mr-5 bg-blue">Edit</button>
                            </div>
                        )}
                    </div>
                </>
            ))} */}
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-row text-white font-normal py-1 mt-3 bg-blue rounded-lg w-full drop-shadow-md">
                <p
                  className="w-full pl-5 cursor-pointer"
                  onClick={() => {
                    const updatedShowInfo = [...showInfo]
                    updatedShowInfo[index] = !updatedShowInfo[index]
                    setShowInfo(updatedShowInfo)
                  }}
                >
                  {item.title}
                </p>
                <input
                  type="checkbox"
                  className={`${
                    showAllSelectBox
                      ? "visible opacity-100"
                      : "invisible opacity-0"
                  } checkbox ml-auto mr-5 checkbox-accent border-[1.5px] border-dashed border-white`}
                  checked={!!checkedStatus[item.nebu_id]} // Coerce to boolean in case the entry is undefined
                  onChange={() => handleCheckboxClick(item.nebu_id)}
                />
              </div>

              <div
                className={`transition-all ease-in duration-00 ${
                  showInfo[index] ? "h-auto opacity-100" : "h-0 opacity-0"
                }`}
              >
                {showInfo[index] && (
                  <div className="flex flex-col bg-white mt-3 pl-5 py-2 pr-2 rounded-lg gap-y-3 drop-shadow-md">
                    <h3 className="text-md mt-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">
                      Duration: {item.duration}
                    </p>
                    <p className="font-normal">{item.description}</p>
                    <div className="flex flex-col md:flex-row">
                      <Button
                        type="button"
                        buttonStyle="btn bg-yellow text-white btn-xs"
                        label={`#${item.official_tag}`}
                      ></Button>
                      <div className="flex gap-x-2 overflow-x-scroll">
                        {item.tags &&
                          item.tags.filter((tag) => tag).length > 0 &&
                          item.tags
                            .filter((tag) => tag)
                            .map((tag, index) => (
                              <Button
                                key={index} // Using index as a key, consider a more stable key if possible
                                type="button"
                                buttonStyle="btn bg-grey text-black btn-xs"
                                label={`#${tag}`} // Prepend "#" to each tag name
                              />
                            ))}
                      </div>
                    </div>
                    <div className="flex gap-x-2 overflow-x-scroll">
                      {item.images.map((imgUrl, imgIndex) =>
                        imgUrl ? ( // Check if imgUrl is truthy (not null, undefined, or empty)
                          <figure key={imgIndex}>
                            <Image
                              alt={`image-${imgIndex}`}
                              src={imgUrl}
                              width={100}
                              height={100}
                            />
                          </figure>
                        ) : (
                          // Optionally render a placeholder if the URL is not available
                          // <figure key={imgIndex}>
                          //   <Image
                          //     alt="there is no image"
                          //     src={altImage}
                          //     width={100}
                          //     height={100}
                          //   />
                          // </figure>
                          <p className="text-xs text-black">There is no image in this nebu.</p>
                        )
                      )}
                    </div>
                    <button className="rounded-lg py-2 px-4 normal-case font-normal text-white ml-auto mr-5 bg-blue">
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}

          {showAllSelectBox ? (
            <div className="flex px-1 lg:px-10">
              <button
                className="mr-auto justify-self-start rounded-lg mt-16 py-2 px-4 normal-case font-normal text-black bg-dark-grey"
                onClick={() => setShowAllSelectBox(!showAllSelectBox)}
              >
                Cancel
              </button>
              <button
                className="ml-auto rounded-lg mt-16 py-2 px-4 normal-case font-normal text-white bg-red"
                onClick={() => setShowDeletePopUp(!showDeletePopUp)}
              >
                Delete
              </button>
            </div>
          ) : (
            <button
              className="rounded-lg mt-16 py-2 px-4 normal-case font-normal text-white ml-auto mr-10 bg-blue"
              onClick={() => setShowAllSelectBox(!showAllSelectBox)}
            >
              Select
            </button>
          )}

          <div
            className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-opacity ease-in duration-200  ${
              showDeletePopUp
                ? "visible opacity-100 shadow-md bg-dim-grey w-[20rem] lg:w-[35rem] border-2"
                : "rounded-sm invisible opacity-0"
            } `}
          >
            <div className="flex flex-col p-7">
              <p className="text-lg">
                Do you want to confirm to delete your Nebu?
              </p>
              <div className="flex px-10">
                <button
                  className="mr-auto justify-self-start rounded-lg mt-16 py-2 px-4 normal-case font-normal text-black bg-dark-grey"
                  onClick={() => setShowDeletePopUp(!showDeletePopUp)}
                >
                  Cancel
                </button>
                <button
                  className="ml-auto rounded-lg mt-16 py-2 px-4 normal-case font-normal text-white bg-red"
                  onClick={() => deleteSelectedNebu()}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
