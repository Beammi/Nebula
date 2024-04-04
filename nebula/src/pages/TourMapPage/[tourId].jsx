import React from "react";
import DynamicMapTour from "@/components/tour/DynamicMapTour"; 
import TourInfoPanel from "@/components/tour/TourInfoPanel"; 
import { useRouter } from 'next/router';

const TourMapPage = () => {
  const router = useRouter();
  const { tourId } = router.query;
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
  