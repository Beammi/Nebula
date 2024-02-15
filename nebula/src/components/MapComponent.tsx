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

import towerBridgePic from "../../public/images/tower-bridge-pic.png"
import sherlockPic from "../../public/images/sherlock-pic.png"
import currentPinLocation from "../../public/images/pin_current_location.png"
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
  const [currentPosition, setCurrentPosition] = useState<[number, number]>([
    13.7563, 100.5018,
  ]) // Default to Bangkok

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
  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Geolocation is supported")
    } else {
      console.log("Geolocation is not supported by your browser")
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition([
          position.coords.latitude,
          position.coords.longitude,
        ])
      },
      (error) => {
        console.error("Error Code = " + error.code + " - " + error.message)
        // Handle different error cases here
      },
      {
        enableHighAccuracy: true, // Request the high accuracy position if available
        timeout: 5000, // Set a timeout for the request
        maximumAge: 0, // Prevent the use of cached positions
      }
    )
  }, [])
  const UpdateMapView = ({ position }) => {
    const map = useMap()
    useEffect(() => {
      map.flyTo(position, map.getZoom())
    }, [position, map])
    console.log("Current Position:", currentPosition)

    return null
  }

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
        <Marker position={currentPosition} icon={currentLocationIcon}>
          <Popup>
            Current Location.
          </Popup>
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
