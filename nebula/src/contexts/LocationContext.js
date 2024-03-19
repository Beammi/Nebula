// LocationContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react"
import { getCurrentLocation, getPlaceName } from "@/utils/navigationUtils"

const defaultState = {
  currentPosition: [13.7563, 100.5018],
  setCurrentPosition: (position) => {
    currentPosition = position
  },
  currentPlace: "",
  setCurrentPlace: (place) => {
    currentPlace = place
  },
}

const LocationContext = createContext(defaultState)

export const useLocation = () => useContext(LocationContext)

export const LocationProvider = ({ children }) => {
  const [currentPosition, setCurrentPosition] = useState([13.7563, 100.5018])
  const [currentPlace, setCurrentPlace] = useState("")
  const [enableContinuousUpdate, setEnableContinuousUpdate] = useState(true)
  const [showMovablePin, setShowMovablePin] = useState(false)
  const updateTimeoutRef = useRef(null) // Ref to store the timeout ID
  const cancelUpdateRef = useRef(false) // Ref to manage cancellation

  useEffect(() => {
    async function fetchCurrentLocation() {
      try {
        const position = await getCurrentLocation()
        setCurrentPosition([position[0], position[1]])
        // Fetch place name for the initial position
        const placeName = await getPlaceName(position[0], position[1])
        setCurrentPlace(placeName)
      } catch (error) {
        console.error("Error getting location:", error)
      }
    }

    async function continuouslyUpdateLocation() {
      if (cancelUpdateRef.current) {
        return // Stop the update if cancellation is requested
      }

      const options = {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          setCurrentPosition([latitude, longitude])

          try {
            const placeName = await getPlaceName(latitude, longitude)
            setCurrentPlace(placeName)
          } catch (error) {
            console.error("Failed to fetch place name:", error)
          }

          // Schedule the next update only if not cancelled
          if (!cancelUpdateRef.current) {
            setTimeout(continuouslyUpdateLocation, 120000) // Update every 60 seconds
          }
        },
        (error) => {
          console.error(error)
          // Retry after 2 minutes on error, only if not cancelled
          if (!cancelUpdateRef.current) {
            setTimeout(continuouslyUpdateLocation, 120000)
          }
        },
        options
      )
    }

    fetchCurrentLocation()
    if (enableContinuousUpdate) {
      continuouslyUpdateLocation()
    }

    // Cleanup function to signal cancellation
    return () => {
      cancelUpdateRef.current = true // Signal to stop updates
    }
  }, [enableContinuousUpdate])

  return (
    <LocationContext.Provider
      value={{
        currentPosition,
        setCurrentPosition,
        currentPlace,
        setCurrentPlace,
        setEnableContinuousUpdate,
        showMovablePin,
        setShowMovablePin,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export default LocationContext
