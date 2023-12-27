import Button from "./Button"

interface ISearchBar {
  text?: string
}

const SearchBar: React.FunctionComponent<ISearchBar> = ({ text }) => {
  return (
    
      <div className="relative w-full 2xl:w-2/5 lg:w-2/5 md:w-1/4 sm:w-3/4 p-4 max-w-md">
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
          <Button buttonStyle="bg-white text-black rounded-full btn-circle btn block md:hidden" label="NL"></Button>
        </div>
        {/* <button className="p-2 btn bg-white">
        <img src="/images/icnSearch.svg" alt="search icon" />
      </button> */}
      </div>
    
  )
}
export default SearchBar
