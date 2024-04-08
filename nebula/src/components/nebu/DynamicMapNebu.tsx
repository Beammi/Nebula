// DynamicMapForNebu.jsx
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useEffect } from "react";
import { useRouter } from "next/router";

const NebuMapComponent = dynamic<any>(
  () => import('./NebuMapComponent'),
  { ssr: false }
);
// Within the parent component of DynamicMapForSearchLocation


const DynamicMapForNebu: React.FC<{ context: string }> = ({ context }) => {
  // console.log("context in dynamic map ",context)
  return (
    <div>
      {/* Force re-rendering when context changes */}
      <NebuMapComponent key={context} context={context} />
    </div>
  );
};


export default DynamicMapForNebu;
