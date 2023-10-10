interface ISearchBar {
  text?: string
}

const SearchBar: React.FunctionComponent<ISearchBar> = ({ text }) => {
  return (
    
      <div className="relative w-full p-4 max-w-md sm:w-3/4 lg:w-1/3 xl:w-1/3 ">
        <input
          type="text"
          className="pl-10 pr-4 py-2 w-full input input-bordered "
          placeholder={text}
        />
        <img
          src="/images/icnSearch.svg"
          alt="search icon"
          className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6"
        />
        {/* <button className="p-2 btn bg-white">
        <img src="/images/icnSearch.svg" alt="search icon" />
      </button> */}
      </div>
    
  )
}
export default SearchBar
