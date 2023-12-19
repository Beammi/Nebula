import React from 'react'

interface PlaceInfoPanelProps { 
  placeData: {
    name: string;
    description: string;
    // Add other properties as needed
  } | null;
  toggle: boolean;
  action: any;
}
  
const PlaceInfoPanel: React.FC<PlaceInfoPanelProps> = ({toggle, action, placeData }) => {

  const my_action = action;
  const my_toggle = toggle;


  // const panelStyle: React.CSSProperties = {
  //   width: '300px',
  //   height: '100vh',
  //   padding: '10px',
  //   backgroundColor: '#fff',
  //   position: 'absolute',
  //   top: 0,
  //   zIndex: -10,
  //   left: placeData ? '0' : '-300px', // Show/hide the panel based on placeData presence
  //   transition: 'left 0.3s ease-in-out', // Add a smooth transition
  // };

  return (
    <div className={`fixed w-80 h-screen p-2.5 bg-white top-0 left-0 tranforms -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out 
      ${my_toggle ? "opacity-100 drop-shadow-2xl" : "hidden"}`}>
      
      <div className='modal-box'>
      
        {placeData ? (
          <>
            <h3 className='font-bold text-lg'>{placeData.name}</h3>
            <p>{placeData.description}</p>
            {/* Add other information as needed */}
          </>
        ) : (
          <p>No place selected</p>
        )}

        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={my_action}>
              Close
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default PlaceInfoPanel;