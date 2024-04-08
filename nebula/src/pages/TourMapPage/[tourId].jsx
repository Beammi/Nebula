import React, { useEffect } from "react";
import DynamicMapTour from "@/components/tour/DynamicMapTour"; 
import TourInfoPanel from "@/components/tour/TourInfoPanel"; 
import { useRouter } from 'next/router';
import { useLocation } from "@/contexts/LocationContext"

const TourMapPage = () => {
  const router = useRouter();
  const { tourId } = router.query;
  const {
    currentPlace,
    setCurrentPlace,
    setEnableContinuousUpdate,
    setCurrentPosition,
  } = useLocation()

  useEffect(() => {
    navigateToTour()

  }, [tourId])

  async function navigateToTour() {
    const response = await fetch(`/api/tour/getTourById?tour_id=${tourId}`)
    const data = await response.json()    

    if (data.places && data.places.length > 0) { // when data is only one (= Object), not Array
      setCurrentPosition([parseFloat(data.places[0].latitude), parseFloat(data.places[0].longitude)]);
    } else {
      console.error("No places found in the tour data.");
    }

  }

  const handleBackHome = () => {
    router.push('/home'); // Assuming '/' is your homepage route
  };
    return (
      <div>
        <DynamicMapTour />
        <button 
        onClick={handleBackHome}
        className="btn btn-primary z-50 absolute top-5 right-5" // Position your button on the map
      > 
        Back to Home
      </button>
        {tourId && <TourInfoPanel tourId={tourId} />} {/* Render TourInfoPanel if tourId is available */}
      </div>
    );
  };
  
  export default TourMapPage;
  