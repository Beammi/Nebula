// components/tour/PlaceCardComponent.tsx
import React from 'react';

interface Place {
  id: number; // Assuming id is a number, adjust according to your data model
  name: string;
}

interface PlaceCardComponentProps {
  place: Place;
  onRemove: (id: number) => void; // Function that takes an id and returns void
}

const PlaceCardComponent: React.FC<PlaceCardComponentProps> = ({ place, onRemove }) => {
  return (
    <div className="place-card">
      <h3>{place.name}</h3>
      <button onClick={() => onRemove(place.id)}>Remove</button>
    </div>
  );
};

export default PlaceCardComponent;
