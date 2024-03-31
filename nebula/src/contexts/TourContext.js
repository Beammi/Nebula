// context/TourContext.js
import React, { createContext, useContext, useState } from "react"

const TourContext = createContext()

export const TourProvider = ({ children }) => {
  const [tourData, setTourData] = useState({
    tourName: "",
    description: "",
    routePlaces: [],
    waypoints: [],
    officialTag: "Official's Tag", // Added state for official tag
    openTagModal: false, // Added state for the open tag modal
    additionalTags: [], // Store for additional tags
  })
  // Function to update the official tag
  const setOfficialTag = (tag) => {
    setTourData((prevData) => ({
      ...prevData,
      officialTag: tag,
    }))
  }
  // Function to add an additional tag
  const addAdditionalTag = (tag) => {
    setTourData((prev) => ({
      ...prev,
      additionalTags: [...prev.additionalTags, tag],
    }))
  }
  // Function to toggle the open tag modal visibility
  const toggleOpenTagModal = () => {
    setTourData((prevData) => ({
      ...prevData,
      openTagModal: !prevData.openTagModal,
    }))
  }
  const addPlace = (place) => {
    setTourData((prevData) => ({
      ...prevData,
      routePlaces: [...prevData.routePlaces, place],
    }))
  }
  const addWaypoint = (waypoint) => {
    setTourData((prevData) => ({
      ...prevData,
      waypoints: [...prevData.waypoints, waypoint],
    }))
  }

  // Optionally, method to remove a waypoint by some identifier, e.g., id
  const removeWaypoint = (waypointId) => {
    setTourData((prevData) => ({
      ...prevData,
      waypoints: prevData.waypoints.filter((wp) => wp.id !== waypointId),
    }))
  }
  // Inside your TourContext provider
  const updateTags = (officialTag, additionalTags) => {
    setTourData((prevData) => ({
      ...prevData,
      officialTag,
      additionalTags: [...prevData.additionalTags, ...additionalTags],
    }))
  }

  return (
    <TourContext.Provider
      value={{
        tourData,
        setTourData,
        addPlace,
        addWaypoint,
        removeWaypoint,
        setOfficialTag,
        toggleOpenTagModal,
        addAdditionalTag,
        updateTags,
      }}
    >
      {children}
    </TourContext.Provider>
  )
}

export const useTour = () => {
  const context = useContext(TourContext)
  if (context === undefined) {
    throw new Error("useTour must be used within a TourProvider")
  }
  return context
}
