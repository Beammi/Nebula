import { useState } from "react"
import Button from "./Button"

interface ISearchBar {
  text?: string
}

const SearchBar: React.FunctionComponent<ISearchBar> = ({ text }) => {

  const [IsOpen, setIsOpen] = useState(false)

  return (
    
      <div className="relative w-full p-4 max-w-md sm:w-3/4 ">
        <input
          type="text"
          className="pl-10 pr-4 py-2 w-full input input-bordered bg-[#fefefe] text-black shadow-neutral-500 shadow-sm"
          placeholder={text}
        />
        <img
          src="/images/icnSearch.svg"
          alt="search icon"
          className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6"
        />
        <div className="absolute right-8 top-8 transform -translate-y-1/2">
          <Button buttonStyle="bg-white text-black rounded-full btn-circle btn block md:hidden" label="NL" onClick={() => setIsOpen(!IsOpen)}></Button>
        </div>
        <div className={`flex flex-col bg-white fixed right-12 p-8 shadow-lg rounded-lg opacity-0 top-24 transition-all ease-in duration-200 ${IsOpen ? 'opacity-100' : 'right-[-200px]'}`}>
              <ul className="flex flex-col gap-4 text-[black]">
                  <li>Profile</li>
                  <li>Your Nebu</li>
                  <li>Your Tour</li>
                  <li>Setting</li>
              </ul>
          </div>
        {/* <button className="p-2 btn bg-white">
        <img src="/images/icnSearch.svg" alt="search icon" />
      </button> */}
      </div>
    
  )
}
export default SearchBar
