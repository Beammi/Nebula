import React from "react";
import DynamicMapTour from "@/components/tour/DynamicMapTour"; 
import TourInfoPanel from "@/components/tour/TourInfoPanel"; 
import { useRouter } from 'next/router';

const TourMapPage = () => {
  const router = useRouter();
  const { tourId } = router.query;
    return (
      <div>
        <DynamicMapTour />
        {tourId && <TourInfoPanel tourId={tourId} />} {/* Render TourInfoPanel if tourId is available */}

      </div>
    );
  };
  
  export default TourMapPage;
  