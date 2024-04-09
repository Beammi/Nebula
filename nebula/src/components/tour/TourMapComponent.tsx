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
import L from "leaflet"

import pinIcon from "../../../public/images/pin-icon.png"
import PlaceInfoPanel from "@/components/nebu/PlaceInfoPanel"
import UpdateMapView from "@/components/map/UpdateMapView"
import "leaflet.markercluster"

import largePinIcon from "../../../public/images/large-pin-icon.png"
import mediumPinIcon from "../../../public/images/medium-pin-icon.png"
import smallPinIcon from "../../../public/images/small-pin-icon.png"

import towerBridgePic from "../../../public/images/tower-bridge-pic.png"
import sherlockPic from "../../../public/images/sherlock-pic.png"
import currentPinLocation from "../../../public/images/pin_current_location.png"
import { getCurrentLocation, getPlaceName } from "@/utils/navigationUtils"
import smallFlag from "../../../public/images/smallFlag.png"
import { useLocation } from "@/contexts/LocationContext"
import LocationSearchPlaceInTour from "@/components/map/LocationSearchPlaceInTour"
import ViewTourList from "@/components/tour/ViewTourList"
import TourInfoPanel from "./TourInfoPanel"
import { useRouter } from "next/router"
import ViewOtherTours from "./ViewOtherTour"
const MyMapTour: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<{
    name: string
    description: string
  } | null>(null)
  const [placeInfoPanel, setPlaceInfoPanel] = useState(false)
  const [showViewTourList, setShowViewTourList] = useState(false)
  const [recommendedPlace, setRecommendedPlace] = useState(null)
  const router = useRouter()
  const { tourId } = router.query
  const [tourDetails, setTourDetails] = useState(null)
  const [tourPosition, setTourPosition] = useState([])
  const [showViewOtherTours, setShowViewOtherTours] = useState(false);
  const toggleViewOtherTours = () => setShowViewOtherTours(!showViewOtherTours);

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const response = await fetch(`/api/tour/getTourById?tour_id=${tourId}`)
        if (response.ok) {
          const data = await response.json()
          setTourDetails(data)
          console.log("Tour", tourDetails)
          setTourPosition([data.places[0].latitude, data.places[0].longitude])
        //   console.log("Tour position", tourPosition)
        } else {
          console.error("Failed to fetch tour details")
        }
      } catch (error) {
        console.error("Error fetching tour details:", error)
      }
    }

    fetchTourDetails()
    // console.log("places ", tourDetails.places)
  }, [])
  useEffect(()=>{
    if(tourDetails?.places[0]?.latitude && tourDetails?.places[0]?.longitude){
      setCurrentPosition([tourDetails?.places[0]?.latitude,tourDetails?.places[0]?.longitude])
    }
  },[tourDetails?.places[0]?.latitude])
  const MapCenterEvents = ({ onCenterChange }) => {
    useMapEvents({
      moveend: (e) => {
        const newCenter = e.target.getCenter()
        onCenterChange(newCenter) // Existing functionality
        // setShowMovablePin(true); // Keep showing the movable pin on map move
        // Fetch and update place name for new center
        getPlaceName(newCenter.lat, newCenter.lng)
          .then((newPlaceName) => {
            setCurrentPlace(newPlaceName) // Assuming this function updates the context or props
          })
          .catch((error) => console.error("Failed to fetch place name:", error))
      },
    })

    return null
  }
  const {
    currentPosition,
    setCurrentPosition,
    currentPlace,
    setCurrentPlace,
    showMovablePin,
    setShowMovablePin,
  } = useLocation()
  // console.log("showMovablePin:", showMovablePin) // Debugging log
  // console.log("current position" + currentPosition + currentPlace)
  const [placeName, setPlaceName] = useState("")
  const [nebus, setNebus] = useState([])

  if (currentPosition === null) {
    const defaultLocation = [13.7563, 100.5018]
    setCurrentPosition(defaultLocation)
  }

  const customIcon = new Icon({
    iconUrl: largePinIcon.src,
    iconSize: [80, 80],
  })
  const tourPinIcon = new Icon({
    iconUrl: smallFlag.src,
    iconSize: [15, 20],
  })
  
  const smallNebuPinIcon = new Icon({
    iconUrl: smallPinIcon.src,
    iconSize: [20, 20],
  })

  const currentLocationIcon = new Icon({
    iconUrl: currentPinLocation.src,
    iconSize: [15, 25],
  })

  const handleMarkerClick = (nebu) => {
    setSelectedPlace(nebu)
    setPlaceInfoPanel(true)
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
      const name = await getPlaceName(center.lat, center.lng) // Fetch place name
      setPlaceName(name) // Update state with place name
      // setCurrentPosition(mapCenter)
    } catch (error) {
      console.error("Failed to fetch place name:", error)
      setPlaceName("Unable to fetch place name")
    }
    console.log("Place name in the center: " + placeName)
  }
  useEffect(() => {
    setShowMovablePin(false)
  }, [])
  useEffect(() => {}, [currentPosition])

  return (
    <div className="h-screen relative">
      <TourInfoPanel
        tour={tourId}
        toggleViewOtherTours={toggleViewOtherTours}
        // action={closePlaceInfoPanel}
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
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* <Marker position={[51.505, -0.09]} icon={customIcon} alt='Tower Bridges'>        
        </Marker> */}
        <MapCenterEvents onCenterChange={handleCenterChange} />
        {tourDetails?.places && tourDetails?.places.length > 0 ? (
          tourDetails.places.map((place, placeIndex) => (
            
            <Marker
            key={placeIndex}
            position={[place.latitude,place.longitude]}
            icon={tourPinIcon}
          >
            <Popup>{place.place_name}</Popup>
          </Marker>
          ))
        ) : (
          <p>Error in loading places...</p>
        )}
        {tourDetails?.waypoints && tourDetails?.waypoints.length > 0 ? (
          tourDetails.waypoints.map((waypoint, placeIndex) => (
            
            <Marker
            key={placeIndex}
            position={[waypoint.latitude,waypoint.longitude]}
            icon={smallNebuPinIcon}
          >
            <Popup>{waypoint.waypoint_name}</Popup>
          </Marker>
          ))
        ) : (
          <p>Error in loading places...</p>
        )}
        {/* <Marker
          key={`position-${currentPosition[0]}-${currentPosition[1]}`}
          position={currentPosition}
          icon={currentLocationIcon}
        >
          <Popup>Current Location.</Popup>
        </Marker> */}
        <ZoomControl position="bottomright" />
        <MapClickHandler handleMapClick={closePlaceInfoPanel} />
      </MapContainer>
      {showViewOtherTours && (
        <ViewOtherTours
          toggle={showViewOtherTours}
          action={toggleViewOtherTours}
          placeName={tourDetails?.places[0].place_name}
        />
      )}
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

export default MyMapTour