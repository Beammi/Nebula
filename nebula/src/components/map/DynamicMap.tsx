import dynamic from 'next/dynamic';
import React from 'react';

const MapComponent = dynamic(
  () => import('./MapComponent'),
  { ssr: false }
);

const DynamicMap: React.FC = () => {
  return (
    <div>
      <MapComponent />
    </div>
  );
};

export default DynamicMap;
