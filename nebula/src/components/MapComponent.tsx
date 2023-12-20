import { Icon } from 'leaflet';
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMapEvents } from 'react-leaflet';
import pinIcon from "../../public/images/pin-icon.png"
import PlaceInfoPanel from '@/components/PlaceInfoPanel';

import towerBridgePic from "../../public/images/tower-bridge-pic.png"


// Sample data for places
const placesData = [
  { name: 'Tower Bridge', description: 'A must destination in UK. Coming in daytime makes your picture much better while the image at night also looks exceptional. This is worth it, there are many attractions near this place. You should come before you die. I recommend it!!'
    , image: {towerBridgePic}, pinSize: "big", lat: 51.505, lon: -0.09 },
  { name: 'London Stadium', description: 'Home of West Ham United', lat: 51.51, lon: -0.1 },
  { name: 'The Sherlock Holmes Museum', description: 'Sherlock Holmes Museum located in London', lat: 51.515, lon: -0.12 },
  // Add more places as needed
];

const MyMap: React.FC = () => {

  const [selectedPlace, setSelectedPlace] = useState<{ name: string; description: string } | null>(null);
  const [placeInfoPanel, setPlaceInfoPanel] = useState(false);

  const customIcon = new Icon({
    iconUrl: pinIcon.src,
    iconSize: [80, 80]
  })

  const handleMarkerClick = (place: { name: string; description: string }) => {
    setSelectedPlace(place);
    setPlaceInfoPanel(true) // click pin -> open only
  };

  function closePlaceInfoPanel(){ // for close
    setPlaceInfoPanel(false)
  }

  return (
    <div className='h-screen relative'>

      <PlaceInfoPanel placeData={selectedPlace} toggle={placeInfoPanel} action={closePlaceInfoPanel}/>

      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%", position: "absolute", zIndex: "0" }} >
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
  );
};

interface MapClickHandlerProps {
  handleMapClick: () => void;
}

const MapClickHandler: React.FC<MapClickHandlerProps> = ({ handleMapClick }) => {
  useMapEvents({
    click: () => {
      // Trigger the handleMapClick function passed from the parent component
      handleMapClick();
    },
  });

  return null;
};

export default MyMap;
