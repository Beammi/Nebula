import React, { createContext, useContext, useState } from "react";

const TourContext = createContext();

export const TourProvider = ({ children }) => {
  const [tourData, setTourData] = useState({
    tourName: "",
    description: "",
    routePlaces: [], // This will now include objects with name, latitude, and longitude
    waypoints: [], // Same here, objects with name, latitude, and longitude
    officialTag: "Official's Tag",
    openTagModal: false,
    additionalTags: [],
  });

  const setOfficialTag = (tag) => {
    setTourData((prevData) => ({
      ...prevData,
      officialTag: tag,
    }));
  };

  const addAdditionalTag = (tag) => {
    setTourData((prev) => ({
      ...prev,
      additionalTags: [...prev.additionalTags, tag],
    }));
  };

  const toggleOpenTagModal = () => {
    setTourData((prevData) => ({
      ...prevData,
      openTagModal: !prevData.openTagModal,
    }));
  };

  const addPlace = (place) => {
    // Assume place is now an object { name, latitude, longitude }
    setTourData((prevData) => ({
      ...prevData,
      routePlaces: [...prevData.routePlaces, place],
    }));
  };

  const addWaypoint = (waypoint) => {
    // Assume waypoint is an object { name, latitude, longitude }
    setTourData((prevData) => ({
      ...prevData,
      waypoints: [...prevData.waypoints, waypoint],
    }));
  };

  const removeWaypoint = (waypointId) => {
    setTourData((prevData) => ({
      ...prevData,
      waypoints: prevData.waypoints.filter((wp) => wp.id !== waypointId),
    }));
  };

  const updateTags = (officialTag, additionalTags) => {
    setTourData((prevData) => ({
      ...prevData,
      officialTag,
      additionalTags: [...prevData.additionalTags, ...additionalTags],
    }));
  };

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
  );
};

export const useTour = () => {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error("useTour must be used within a TourProvider");
  }
  return context;
};
