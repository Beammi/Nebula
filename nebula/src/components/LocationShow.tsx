//LocationShow.tsx

import React from "react"

interface ILocationShow {
  text?: string
}

const LocationShow: React.FunctionComponent<ILocationShow> = ({ text }) => {
  return (
    <div>
      <div className="card w-48 md:w-96 bg-white text-black">
        <div className="card-body w-full">
          <h2 className="card-title">Location</h2>
          <p className="h-10 overflow-y-auto text-sm">{text}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-sm btn-primary text-white">Change</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LocationShow
