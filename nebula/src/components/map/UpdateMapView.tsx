//UpdateMapView.tsx
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const UpdateMapView = ({ position ,zoomLevel = 15 }) => {
    const map = useMap();

    useEffect(() => {
      if (position && map) {
        map.flyTo(position, zoomLevel);
        console.log("Current Position:", position); // Use `position` instead of `currentPosition`
      }
    }, [position, map]); // Effect runs when `position` or `map` changes

    return null; // This component does not render anything itself
};
export default UpdateMapView;