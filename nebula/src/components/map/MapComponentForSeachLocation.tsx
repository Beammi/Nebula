//MapComponent.tsx
// @ts-nocheck

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
import PlaceInfoPanel from "@/components/nebu/PlaceInfoPanel"
import UpdateMapView from "@/components/map/UpdateMapView"

import largePinIcon from "../../../public/images/large-pin-icon.png"
import mediumPinIcon from "../../../public/images/medium-pin-icon.png"
import smallPinIcon from "../../../public/images/small-pin-icon.png"

import towerBridgePic from "../../../public/images/tower-bridge-pic.png"
import sherlockPic from "../../../public/images/sherlock-pic.png"
import currentPinLocation from "../../../public/images/pin_current_location.png"
import { getCurrentLocation, getPlaceName } from "@/utils/navigationUtils"
import LocationShowAndSearch from "./LocationShowAndSearch"
import { useLocation } from "@/contexts/LocationContext"
import LocationSearchPlaceInTour from "@/components/map/LocationSearchPlaceInTour";
import { useRouter } from "next/router";

interface MyMapForSearchProps {
  context?: string; 
}

const MyMapForSearch: React.FC<{ context: string }> = ({ context }) => {
  const [selectedPlace, setSelectedPlace] = useState<{
    name: string
    description: string
  } | null>(null)
  const [placeInfoPanel, setPlaceInfoPanel] = useState(false)
  const router = useRouter();
  // const [context, setContext] = useState(""); // Default context
  const queryContext = router.query.context;
  // console.log("Context in Map: ", queryContext)
  // const [currentPosition, setCurrentPosition] = useState<[number, number]>([
  //   14.7563, 100.5018,
  // ]) // Default to Bangkok
  // const [currentPlace, setCurrentPlace] = useState("")
  const MapCenterEvents = ({ onCenterChange }) => {
    useMapEvents({
      moveend: (e) => {
        const center = e.target.getCenter()
        onCenterChange(center) // Callback to update parent component's state
      },
    })
  
    return null
  }
  const { currentPosition, setCurrentPosition, currentPlace, setCurrentPlace } =
    useLocation()
  const [placeName, setPlaceName] = useState("")

  if (currentPosition === null) {
    const defaultLocation = [13.7563, 100.5018]
    setCurrentPosition(defaultLocation)
  }

  const customIcon = new Icon({
    iconUrl: largePinIcon.src,
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
  const [mapCenter, setMapCenter] = useState({
    lat: currentPosition[0],
    lng: currentPosition[1],
  }) // Default center

  const handleCenterChange = async (center) => {
    setMapCenter(center) // Update map center state
    console.log("Map Center: " + mapCenter)
    try {
      const name = await getPlaceName(center.lat, center.lng); // Fetch place name
      setPlaceName(name); // Update state with place name
    } catch (error) {
      console.error("Failed to fetch place name:", error);
      setPlaceName("Unable to fetch place name");
    }
    console.log("Place name in the center: "+ placeName)
  }
  
  return (
    <div className="h-screen relative">
      {/* <PlaceInfoPanel
        placeData={selectedPlace}
        toggle={placeInfoPanel}
        action={closePlaceInfoPanel}
      /> */}

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
        <MapCenterEvents onCenterChange={handleCenterChange} />

        {/* {placesData.map((place, index) => (
          <Marker
            key={index}
            position={[place.lat, place.lon]}
            icon={customIcon}
            eventHandlers={{ click: () => handleMarkerClick(place) }}
          >
            <Popup>{place.name}</Popup>
          </Marker>
        ))} */}

        <ZoomControl position="bottomright" />
        <MapClickHandler handleMapClick={closePlaceInfoPanel} />
      </MapContainer>
      <LocationSearchPlaceInTour text={placeName} location={mapCenter} mode={queryContext}/>
      <div className="fixed left-2/4 bottom-0 w-auto text-center z-10 transform -translate-x-1/2"></div>
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

export default MyMapForSearch
