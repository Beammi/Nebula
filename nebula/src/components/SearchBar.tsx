interface ISearchBar {
  style?: string
  text?: string
}

const P: React.FunctionComponent<ISearchBar> = ({ style, text }) => {
  return (
    <div className="relative">
      <input type="text" className="input input-bordered" placeholder={text} />
      <button className="btn bg-white absolute">
        <img src="/images/icnSearch.svg" alt="search icon" />

      </button>
    </div>
  )
}
export default P
