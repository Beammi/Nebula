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
import L from "leaflet"

import pinIcon from "../../public/images/pin-icon.png"
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
import LocationShowAndSearch from "./LocationShowAndSearch"
import { useLocation } from "@/contexts/LocationContext"
import LocationSearchPlaceInTour from "@/components/map/LocationSearchPlaceInTour"
import ViewTourList from "@/components/tour/ViewTourList"

import MoveablePin from "./MoveablePin"
const MarkerCluster = ({ nebus, onMarkerClick }) => {
  const map = useMap()
  const smallNebuPinIcon = new Icon({
    iconUrl: smallPinIcon.src,
    iconSize: [20, 20],
  })

  useEffect(() => {
    // @ts-ignore
    const markerClusterGroup = L.markerClusterGroup()

    nebus.forEach((nebu) => {
      const marker = L.marker([nebu.latitude, nebu.longitude], {
        title: nebu.title,
        icon: smallNebuPinIcon,
      })
        .bindPopup(`<b>${nebu.title}</b>`)
        .on("click", () => onMarkerClick(nebu))

      markerClusterGroup.addLayer(marker)
    })

    map.addLayer(markerClusterGroup)

    return () => {
      map.removeLayer(markerClusterGroup)
    }
  }, [map, nebus, onMarkerClick]) // Ensure the effect runs when `nebus` or `map` changes

  return null
}
const MyMap: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<{
    name: string
    description: string
  } | null>(null)
  const [placeInfoPanel, setPlaceInfoPanel] = useState(false)
  const [showViewTourList, setShowViewTourList] = useState(false)
  const [recommendedPlace, setRecommendedPlace] = useState(null)

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
  useEffect(() => {
    async function fetchNebuPosts() {
      try {
        const response = await fetch(
          `/api/nebu/nebuPosts?lat=${mapCenter.lat}&lon=${mapCenter.lng}&radius=100`
        )
        if (!response.ok) throw new Error("Failed to fetch")
        const data = await response.json()
        setNebus(data)
        // console.log("Nebu: " + JSON.stringify(nebus))
      } catch (error) {
        console.error("Error fetching Nebu posts:", error)
      }
    }
    console.log(showMovablePin)

    fetchNebuPosts()
  }, [mapCenter])

  return (
    <div className="h-screen relative">
      
      <PlaceInfoPanel
        nebu={selectedPlace}
        toggle={placeInfoPanel}
        action={closePlaceInfoPanel}
        onRecommendTour={(selectedPlace) => {
          setRecommendedPlace(selectedPlace)
          setShowViewTourList(true)
        }}
      />
      {/* <TourInfoPanel
        tour={selectedPlace}
        toggle={placeInfoPanel}
        action={closePlaceInfoPanel}
      /> */}

      <MapContainer
      // @ts-ignore
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
        <MarkerCluster nebus={nebus} onMarkerClick={handleMarkerClick} />

        <Marker
          key={`position-${currentPosition[0]}-${currentPosition[1]}`}
          // @ts-ignore
          position={currentPosition}
          icon={currentLocationIcon}
        >
          <Popup>Current Location.</Popup>
        </Marker>
        {/* {nebus.map((nebu, index) => (
          <Marker
            key={index}
            position={[nebu.latitude, nebu.longitude]} // Ensure your nebu objects have latitude and longitude properties
            icon={smallNebuPinIcon}
            eventHandlers={{
              click: () => handleMarkerClick(nebu),
            }}
          >
            <Popup>{nebu.title}</Popup>
          </Marker>
        ))} */}
        <ZoomControl position="bottomright" />
        <MapClickHandler handleMapClick={closePlaceInfoPanel} />
      </MapContainer>
      {showMovablePin && <MoveablePin />}
      
      
      <LocationShowAndSearch text={currentPlace}  location={mapCenter as any} />
      {showViewTourList && (
        <ViewTourList
          toggle={showViewTourList}
          action={() => setShowViewTourList(false)}
          nebu={selectedPlace}
        />
      )}
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

export default MyMap
