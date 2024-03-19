import dynamic from 'next/dynamic';
import React from 'react';

const MapComponentForSearchLocation = dynamic(
  () => import('./MyMapForSearch'),
  { ssr: false }
);

const DynamicMap: React.FC = () => {
  return (
    <div>
      <MapComponentForSearchLocation />
    </div>
  );
};

export default DynamicMap;
