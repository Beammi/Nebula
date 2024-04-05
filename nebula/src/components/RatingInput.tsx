import React, { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import altProfilePic from "../../public/images/altProfilePic.png"

const RatingInput = ({ nebuId }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [email, setEmail] = useState("")
  const [provider, setProvider] = useState("")
  const [userId, setUserId] = useState(0)
  const [userProfilePic, setUserProfilePic] = useState()
  async function getEmail() {
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
        setUserId(data.user_id)
        console.log("user id", userId)

        setUserProfilePic(data.profile_picture_url)
      } else {
        // alert("Please Login")
        throw new Error(
          data.message || "An error occurred while fetching the profile"
        )
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error)
    }
  }
  const postRating = async () => {
    if (!userId) {
      alert("Please Login")
      return console.error("User not found.")
    }
    

    const response = await fetch("/api/nebu/rating/postRatingOfNebu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rate: rating,
        ratingComment: comment,
        userId: userId,
        nebuId: nebuId,
      }),
    })

    if (!response.ok) {
      console.error("Can't add rating")
    } else {
      console.log("Rating added successfully")
      setRating(0) // Reset after successful submission
      setComment("")
    }
  }
  useEffect(() => {
    getEmail()
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    setRating(0) // Reset the rating
    setComment("") // Clear the comment input field
  }
  const handleRating = (rateValue) => {
    setRating(rateValue)
    console.log("Rate", rateValue)
  }
  const getInitials = (email: string) => email.substring(0, 2).toUpperCase()

  // Prepare rating inputs based on the current rating
  const ratingInputs = Array.from({ length: 5 }, (_, i) => (
    <input
      key={i}
      type="radio"
      name="rating-5"
      className="mask mask-star-2 bg-yellow"
      checked={rating === i + 1}
      onChange={() => handleRating(i + 1)}
    />
  ))
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex mt-4">
        {userProfilePic ? (
          <img
            src={userProfilePic}
            className="ml-8 h-12 w-12 rounded-full border-2 border-white"
            alt=""
          />
        ) : (
          <div className="ml-8 flex items-center justify-center h-12 w-12 rounded-full bg-gray-500 text-white text-sm">
            {getInitials(email)}
          </div>
        )}{" "}
        <div className="flex mt-1 h-min">
          <div className="rating rating-sm p-4">{ratingInputs}</div>
        </div>
      </div>

      <div className="-mt-4 flex flex-row">
        <input
          type="text"
          placeholder="Type your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="input input-bordered ml-20 mr-4 bg-white rounded-none border-x-0 border-t-0 border-b-2 focus:outline-0 focus:outline-offset-0 focus:border-black transition-all delay-100 ease-in-out w-full max-w-xs"
        />
        <button
          onClick={postRating}
          className="mt-4 py-1 px-2 rounded-lg mr-1 normal-case bg-grey border-0 text-black"
          type="button"
        >
          Confirm
        </button>
      </div>
    </form>
  )
}

export default RatingInput
