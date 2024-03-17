import Button from "./Button"
import React, { useEffect, useRef, useState } from "react"
import ImageUpload from "./ImageUpload"
import TimeLimitBox from "./TimeLimitBox"
import Image from "next/image"
import closeIcon from "../../public/images/close.png"
import smallHashtag from "../../public/images/smallHashtag_blue.png"
import filterIcon from "../../public/images/filter-icon.png"
import skyPic from "../../public/images/skyPic.png"
import profilePic from "../../public/images/lionelPic.png"
import davidProfilePic from "../../public/images/davidProfilePic.png"
import holmesPic from "../../public/images/holmesPic.png"
import ferryWheelPic from "../../public/images/ferryWheelPic.png"
import whiteCloseIcon from "../../public/images/whiteCloseIcon.png"
import addPhotoIcon from "../../public/images/addPhoto.png"
import altImage from "../../public/images/altImage.png"
import { supabase } from "@/lib/supabaseClient"

import Link from "next/link"
// import smallHashtag from "../../public/images/smallHashtag.png";
import NebuTag from "./NebuTag"

export default function Profile(props) {
  const state = props.toggle
  const action = props.action
  const accountName = props.accountName
  const [showEditable, setShowEditable] = useState(false)
  const [newProfilePic, setNewProfilePic] = useState<File | null>(null)
  const [newBackgroundPic, setNewBackgroundPic] = useState<File | null>(null)
  const profilePicRef = useRef(null)
  const backgroundPicRef = useRef(null)
  const [email, setEmail] = useState("")
  const [provider, setProvider] = useState("")
  const prevProfileDataRef = useRef()
  const [originalProfilePicURL, setOriginalProfilePicURL] = useState(null)
  const [profileData, setProfileData] = useState({
    firstname: "",
    lastname: "",
    bio: "",
    profilePictureUrl: null,
    bgPictureUrl: null,
  })

  const saveProfile = async () => {
    let profilePicUrl = profileData.profilePictureUrl
    let bgPicUrl = profileData.bgPictureUrl

    //delete previous image
    // console.log("Pass delete1" + profileData.profilePictureUrl)
    fetchProfile(email,provider)
    if (
      originalProfilePicURL &&
      originalProfilePicURL.startsWith("https://")
    ) {
      console.log("Pass delete2" + profileData.profilePictureUrl)
      await deleteImage(originalProfilePicURL)
    }

    if (newProfilePic) {
      const formData = new FormData()
      formData.append("image", newProfilePic)
      const uploadResponse = await uploadImage(formData, "profile")
      if (uploadResponse) {
        profilePicUrl = uploadResponse // Use the direct URL
        console.log("Profileeeee: " + profilePicUrl)
      }
    }

    if (newBackgroundPic) {
      const formData = new FormData()
      formData.append("image", newBackgroundPic)
      const uploadResponse = await uploadImage(formData, "background")
      if (uploadResponse) {
        bgPicUrl = uploadResponse // Use the direct URL
      }
    }

    const profileUpdate = {
      email,
      provider,
      firstname: profileData.firstname,
      lastname: profileData.lastname,
      bio: profileData.bio,
      profile_picture_url:
        profilePicUrl !== profileData.profilePictureUrl
          ? profilePicUrl
          : undefined,
      bg_picture_url:
        bgPicUrl !== profileData.bgPictureUrl ? bgPicUrl : undefined,
    }
    console.log("Profile Update: " + profileUpdate.profile_picture_url)
    // Update the profile in your database
    try {
      const response = await fetch("/api/users/updateProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileUpdate),
      })

      if (!response.ok) {
        throw new Error("Failed to update profile.")
      }
      console.log("Profile updated successfully")
      setShowEditable(false)
      getEmail()
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }
  const handleEditClick = async() => {
    fetchProfile(email,provider);
    if(originalProfilePicURL===null){
      fetchProfile(email,provider);
    }
    setShowEditable(true)
  }

  // Adjusted function to handle profile picture upload from ImageUpload
  const handleProfilePicChange = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0]

      // Validate the file type if needed
      if (!/\.(jpg|jpeg|png|gif)$/i.test(file.name)) {
        alert("Please select a valid image file (jpg, jpeg, png, gif).")
        return
      }

      // Create a data URL for immediate preview
      const reader = new FileReader()
      reader.onload = (event) => {
        // Set the preview URL in your state
        setProfileData((prevState) => ({
          ...prevState,
          profilePictureUrl: event.target.result,
        }))
        // Store the file object for later upload
        setNewProfilePic(file)
        console.log("pf file" + newProfilePic)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBackgroundPicChange = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0] // Assuming you're only interested in the first file

      // Validate the file type if needed
      if (!/\.(jpg|jpeg|png|gif)$/i.test(file.name)) {
        alert("Please select a valid image file (jpg, jpeg, png, gif).")
        return
      }

      // Create a data URL for immediate preview
      const reader = new FileReader()
      reader.onload = (event) => {
        // Set the preview URL in your state
        setProfileData((prevState) => ({
          ...prevState,
          bgPictureUrl: event.target.result,
        }))
        // Store the file object for later upload
        setNewBackgroundPic(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (formData, type) => {
    try {
      const response = await fetch("/api/azure/uploadImages", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()

      if (response.ok) {
        console.log("Upload successful for", type, ":", data.imageUrl)
        return data.imageUrl // Return the URL on success
      } else {
        throw new Error(data.message || "Failed to upload image.")
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      return null // Return null to indicate failure
    }
  }

  const handleCancel = () => {
    // Reset input fields and images to their default values
    setProfileData({
      firstname: "",
      lastname: "",
      bio: "",
      profilePictureUrl: null,
      bgPictureUrl: null,
    })

    // Clear the file input for profile picture
    setNewProfilePic(null)
    if (profilePicRef.current) {
      profilePicRef.current.value = "" // This directly resets the file input
    }

    setNewBackgroundPic(null)
    if (backgroundPicRef.current) {
      backgroundPicRef.current.value = "" // Reset the background file input as well
    }

    // Hide the editable fields again
    setShowEditable(false)
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
    fetchProfile(userEmail, userProvider)
  }
  const fetchProfile = async (email, provider) => {
    const url = `/api/users/getUserProfile?email=${encodeURIComponent(
      email
    )}&provider=${encodeURIComponent(provider)}`
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (response.ok) {
        const uniqueString = new Date().getTime()
        // Append unique string to URLs to avoid cache issues
        const profilePictureUrl = data.profile_picture_url
          ? `${data.profile_picture_url}?${uniqueString}`
          : altImage.src
        const bgPictureUrl = data.bg_picture_url
          ? `${data.bg_picture_url}?${uniqueString}`
          : altImage.src
        setOriginalProfilePicURL(data.profile_picture_url)
        console.log("Original pic in fetchhhh: "+originalProfilePicURL)
        setProfileData({
          firstname: data.firstname || "",
          lastname: data.lastname || "",
          bio: data.bio || "",
          profilePictureUrl,
          bgPictureUrl,
        })
      } else {
        throw new Error(
          data.message || "An error occurred while fetching the profile"
        )
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error)
    }
  }

  const deleteImage = async (imageUrl) => {
    const blobName = imageUrl.split("/nebuimages/")[1]
    try {
      const response = await fetch("/api/azure/deleteImage", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blobName }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete image.")
      }

      console.log("Image deleted successfully:", data)
    } catch (error) {
      console.error("Error deleting image:", error)
    }
  }

  useEffect(() => {
    getEmail()
    console.log("Updated profile data:", profileData.profilePictureUrl)
  }, [])
  return (
    <div
      className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-all ease-in duration-500 ${
        state
          ? "visible opacity-100 drop-shadow-2xl"
          : "rounded-sm invisible opacity-0"
      } `}
    >
      <div className="relative flex flex-col rounded-lg shadow-md bg-dim-grey w-[23rem] lg:w-[35rem] font-bold text-black h-auto lg:h-[38rem] items-stretch overflow-y-scroll">
        <div className="flex flex-col justify-start">
          <div className="relative w-full h-[200px] rounded-t-lg overflow-hidden">
            <img
              src={
                profileData.bgPictureUrl
                  ? profileData.bgPictureUrl
                  : altImage.src
              } // Fallback to altImage.src if bgPictureUrl is null
              alt="Background"
              className={`w-full h-full object-cover ${
                showEditable ? "filter brightness-75" : "filter-none"
              }`}
            />
            {/* Background change input and label here */}
            {showEditable && (
              <label
                htmlFor="backgroundPicInput"
                className={`absolute inset-0 flex items-center justify-center cursor-pointer ${
                  showEditable ? "visible" : "invisible"
                }`}
                onClick={() => {
                  if (showEditable && backgroundPicRef.current) {
                    backgroundPicRef.current.click()
                  }
                }}
              >
                <Image
                  src={addPhotoIcon}
                  alt="add photo"
                  width={45}
                  className="opacity-60"
                  onChange={handleBackgroundPicChange}
                />
              </label>
            )}
            <button
              onClick={action}
              className="absolute top-0 right-0 mt-4 mr-4 z-10"
            >
              <Image
                src={whiteCloseIcon}
                alt="clsbtn"
                className=""
                width={20}
              />
            </button>
          </div>

          {/* Profile picture part */}
          <div className="px-8 flex ">
            <figure
              className={`lg:w-1/6 w-[23%] z-10 lg:-mt-10 -mt-8 ${
                showEditable ? "cursor-pointer" : ""
              }`}
              onClick={() => showEditable && profilePicRef.current.click()}
            >
              <img
                src={
                  profileData.profilePictureUrl
                    ? profileData.profilePictureUrl
                    : altImage.src
                } // Fallback to profilePic.src if profilePictureUrl is null
                alt="Profile"
                width={50}
                height={50}
                className={`w-52 ${
                  showEditable ? "filter brightness-75" : "filter-none"
                }`}
              />
              {/* Add photo icon overlay here */}
              <img
                src={addPhotoIcon.src}
                alt="pic"
                className={`w-[43%] opacity-60 lg:-mt-[62px] lg:ml-[21px] -mt-[51px] ml-[17px] ${
                  showEditable ? "visible" : "invisible"
                }`}
              />
            </figure>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                handleProfilePicChange(e)
              }}
              className="hidden"
              id="profilePicInput"
              ref={profilePicRef}
            />

            <h3 className="text-2xl text-black ml-3 mt-1">{email}</h3>
          </div>
        </div>

        <div className="lg:pl-14 lg:pr-16 px-7 mt-6 grid grid-cols-2 gap-y-5 items-center ">
          <p className="text-base font-medium w-fit">First name</p>
          <input
            type="text"
            value={profileData.firstname}
            className={`input input-bordered bg-grey shadow font-medium disabled:bg-grey disabled:border-0 disabled:text-black-grey`}
            disabled={!showEditable}
            onChange={(e) =>
              setProfileData({ ...profileData, firstname: e.target.value })
            }
          />
          <p className="text-base font-medium w-fit">Last name</p>
          <input
            type="text"
            value={profileData.lastname}
            className={`input input-bordered bg-grey shadow font-medium disabled:bg-grey disabled:border-0 disabled:text-black-grey`}
            disabled={!showEditable}
            onChange={(e) =>
              setProfileData({ ...profileData, lastname: e.target.value })
            }
          />
          <p className="text-base font-medium w-fit">Bio</p>
          <textarea
            value={profileData.bio}
            className={`textarea textarea-md w-full bg-grey shadow text-base font-medium disabled:bg-grey disabled:border-0 disabled:text-black-grey`}
            disabled={!showEditable}
            onChange={(e) =>
              setProfileData({ ...profileData, bio: e.target.value })
            }
          ></textarea>
        </div>

        {showEditable ? (
          <div className="flex px-7 mb-5 lg:mb-0 lg:px-10">
            <button
              className="mr-auto justify-self-start rounded-3xl mt-11 py-2 px-4 normal-case font-normal text-black bg-dark-grey"
              // onClick={() => setShowEditable(!showEditable)}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="ml-auto rounded-3xl mt-11 py-2 px-4 normal-case font-normal text-white bg-blue"
              onClick={() => saveProfile()}
            >
              Save
            </button>
          </div>
        ) : (
          <button
            className="ml-auto rounded-3xl py-2 px-4 normal-case font-normal text-black bg-dim-grey border-2 border-black self-center mr-5 lg:mt-11 my-7 text-lg  shadow"
            onClick={handleEditClick}
          >
            Edit profile
          </button>
        )}
      </div>
    </div>
  )
}
