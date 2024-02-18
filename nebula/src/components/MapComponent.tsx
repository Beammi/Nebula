//MapComponent.tsx
import { Icon } from "leaflet"
import React, { useState, useEffect } from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMapEvents,
  useMap,
} from "react-leaflet"
import pinIcon from "../../public/images/pin-icon.png"
import PlaceInfoPanel from "@/components/PlaceInfoPanel"
import UpdateMapView from "@/components/UpdateMapView"
import towerBridgePic from "../../public/images/tower-bridge-pic.png"
import sherlockPic from "../../public/images/sherlock-pic.png"
import currentPinLocation from "../../public/images/pin_current_location.png"
import { getCurrentLocation, getPlaceName } from "@/utils/navigationUtils"
import LocationShow from "./LocationShow"
import { useLocation } from "@/contexts/LocationContext"

// Sample data for places
export const placesData = [
  {
    name: "Tower Bridge",
    description:
      "A must destination in UK. Coming in daytime makes your picture much better while the image at night also looks exceptional. This is worth it, there are many attractions near this place. You should come before you die. I recommend it!!",
    image: { towerBridgePic },
    pinSize: "big",
    lat: 51.505,
    lon: -0.09,
  },
  {
    name: "London Stadium",
    description: "Home of West Ham United",
    image: { sherlockPic },
    pinSize: "big",
    lat: 51.51,
    lon: -0.1,
  },
  {
    name: "The Sherlock Holmes Museum",
    description: "Sherlock Holmes Museum located in London",
    lat: 51.515,
    lon: -0.12,
  },
  // Add more places as needed
]

const MyMap: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<{
    name: string
    description: string
  } | null>(null)
  const [placeInfoPanel, setPlaceInfoPanel] = useState(false)
  // const [currentPosition, setCurrentPosition] = useState<[number, number]>([
  //   14.7563, 100.5018,
  // ]) // Default to Bangkok
  // const [currentPlace, setCurrentPlace] = useState("")
  const { currentPosition, setCurrentPosition, currentPlace, setCurrentPlace } =
    useLocation()

  if (currentPosition === null) {
    const defaultLocation = [13.7563, 100.5018]
    setCurrentPosition(defaultLocation)
  }

  const customIcon = new Icon({
    iconUrl: pinIcon.src,
    iconSize: [80, 80],
  })

  const currentLocationIcon = new Icon({
    iconUrl: currentPinLocation.src,
    iconSize: [18, 30],
  })

  const handleMarkerClick = (place: { name: string; description: string }) => {
    setSelectedPlace(place)
    setPlaceInfoPanel(true) // click pin -> open only
  }

  function closePlaceInfoPanel() {
    // for close
    setPlaceInfoPanel(false)
  }
  // async function fetchCurrentLocation() {
  //   try {
  //     setCurrentPosition(await getCurrentLocation())
  //     console.log(
  //       "Current Lat: ",
  //       currentPosition[0],
  //       " Current Long: ",
  //       currentPosition[1]
  //     )
  //   } catch (error) {
  //     console.error("Error getting location:", error)
  //     // Handle errors, such as user denying geolocation permission
  //   }
  // }
  // function continuouslyUpdateLocation() {
  //   const options = {
  //     enableHighAccuracy: true,
  //     maximumAge: 0,
  //     timeout: 10000,
  //   }

  //   async function update() {
  //     // Make the function async
  //     navigator.geolocation.getCurrentPosition(
  //       async (position) => {
  //         // Mark this callback as async
  //         // Process position
  //         const { latitude, longitude } = position.coords
  //         setCurrentPosition([latitude,longitude])
  //         console.log("Update: ", latitude, longitude)

  //         try {
  //           // Use the latitude and longitude to get the place name
  //           const placeName = await getPlaceName(latitude, longitude)
  //           console.log("Place Name update:", placeName)
  //           setCurrentPlace(placeName)
  //         } catch (error) {
  //           console.error("Failed to fetch place name:", error)
  //         }

  //         // Schedule the next update
  //         setTimeout(update, 120000) // Update every 60 seconds, adjust as needed
  //       },
  //       (error) => {
  //         console.error(error)
  //         setTimeout(update, 120000) // Attempt to update again after a delay
  //       },
  //       options
  //     )
  //   }

  //   update() // Start the update process
  // }
  // useEffect(() => {
  //   fetchCurrentLocation()
  //   continuouslyUpdateLocation()
  // }, [])

  return (
    <div className="h-screen relative">
      <PlaceInfoPanel
        placeData={selectedPlace}
        toggle={placeInfoPanel}
        action={closePlaceInfoPanel}
      />

      <MapContainer
        center={currentPosition}
        zoom={13}
        style={{
          height: "100vh",
          width: "100%",
          position: "absolute",
          zIndex: "0",
        }}
      >
        <UpdateMapView position={currentPosition} />
        {/* Use currentPosition.toString() as a key for the Marker */}
        <Marker
          key={`position-${currentPosition[0]}-${currentPosition[1]}`}
          position={currentPosition}
          icon={currentLocationIcon}
        >
          <Popup>Current Location.</Popup>
        </Marker>

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* <Marker position={[51.505, -0.09]} icon={customIcon} alt='Tower Bridges'>        
        </Marker> */}

        {placesData.map((place, index) => (
          <Marker
            key={index}
            position={[place.lat, place.lon]}
            icon={customIcon}
            eventHandlers={{ click: () => handleMarkerClick(place) }}
          >
            <Popup>{place.name}</Popup>
          </Marker>
        ))}

        <ZoomControl position="bottomright" />
        <MapClickHandler handleMapClick={closePlaceInfoPanel} />
      </MapContainer>
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 w-auto text-center z-10">
        <LocationShow text={currentPlace} location={currentPosition} />
      </div>
    </div>
  )
}

interface MapClickHandlerProps {
  handleMapClick: () => void
}

const MapClickHandler: React.FC<MapClickHandlerProps> = ({
  handleMapClick,
}) => {
  useMapEvents({
    click: () => {
      // Trigger the handleMapClick function passed from the parent component
      handleMapClick()
    },
  })

  return null
}

export default MyMap