import { Icon } from 'leaflet';
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMapEvents } from 'react-leaflet';
import pinIcon from "../../public/images/pin-icon.png"
import PlaceInfoPanel from '@/components/PlaceInfoPanel';

// Sample data for places
const placesData = [
  { name: 'Tower Bridge', description: 'A must destination', lat: 51.505, lon: -0.09 },
  { name: 'London Stadium', description: 'Home of West ham united', lat: 51.51, lon: -0.1 },
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
    setPlaceInfoPanel(!placeInfoPanel) // for open
  };

  function closePlaceInfoPanel(){ // for close
    setPlaceInfoPanel(!placeInfoPanel)
  }

  return (
    <div className='h-screen relative'>

      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%", position: "absolute" }} >
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
      </MapContainer>
      
      <h3 className='fixed z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red text-center font-bold text-lg'>
        Natthapong's leaflet map
      </h3>

      <PlaceInfoPanel placeData={selectedPlace} toggle={placeInfoPanel} action={closePlaceInfoPanel}/>
    </div>
  );
};

export default MyMap;
