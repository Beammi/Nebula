// DynamicMapForSearchLocation.jsx
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useEffect } from "react";
import { useRouter } from "next/router";

const MapComponentTour = dynamic<any>(
  () => import('./MyMapTour'),
  { ssr: false }
);
// Within the parent component of DynamicMapForSearchLocation


const DynamicMapForSearchLocation: React.FC<{ context: string }> = ({ context }) => {
  console.log("context in dynamic map ",context)
  return (
    <div>
      {/* Force re-rendering when context changes */}
      <MapComponentTour key={context} context={context} />
    </div>
  );
};


export default DynamicMapForSearchLocation;
