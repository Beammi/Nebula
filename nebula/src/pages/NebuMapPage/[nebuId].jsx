//NebuMapPage/[nebuId].jsx
import DynamicMapNebu from "@/components/nebu/DynamicMapNebu"
import PlaceInfoPanel from "@/components/nebu/PlaceInfoPanel"
import { useRouter } from "next/router"
import { supabase } from "@/lib/supabaseClient"
import React, { useState, useEffect } from "react"

const NebuMapPage = () => {
  const router = useRouter()
  const { nebuId } = router.query
  const [nebuDetails, setNebuDetails] = useState(null)
  const [email, setEmail] = useState("")
  const [provider, setProvider] = useState("")
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
        const userIdForFetch = data.user_id
        setUserId(userIdForFetch)
      } else {
        throw new Error(
          data.message || "An error occurred while fetching the profile"
        )
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error)
    }
  }

  useEffect(() => {
    getEmail()
  }, [])

  
  const handleBackHome = () => {
    router.push("/home") // Assuming '/' is your homepage route
  }
  return (
    <div>
      <DynamicMapNebu />
      <button
        onClick={handleBackHome}
        className="btn btn-primary z-50 absolute top-5 right-5" // Position your button on the map
      >
        Back to Home
      </button>
      {nebuId && <PlaceInfoPanel nebu={nebuDetails} />}
    </div>
  )
}

export default NebuMapPage
