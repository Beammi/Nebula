// DynamicMapForSearchLocation.jsx
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useEffect } from "react";
import { useRouter } from "next/router";

const MapComponentForSearchLocation = dynamic<any>(
  () => import('./MyMapForSearch'),
  { ssr: false }
);
// Within the parent component of DynamicMapForSearchLocation


// In DynamicMapForSearchLocation
const DynamicMapForSearchLocation: React.FC<{ context: string }> = ({ context }) => {
  console.log("context in dynamic map ",context)
  return (
    <div>
      {/* Force re-rendering when context changes */}
      <MapComponentForSearchLocation key={context} context={context} />
    </div>
  );
};


export default DynamicMapForSearchLocation;
