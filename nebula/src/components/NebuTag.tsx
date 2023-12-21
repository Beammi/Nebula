export default function NebuTag(props) {
  const OpenTag = props.toggle;

  return (
    <div
      className={`fixed top-1/2 left-1/2 tranforms -translate-x-1/2 -translate-y-1/2 transition-all ease-in duration-500 ${
        OpenTag ? "visible opacity-100 drop-shadow-2xl" : "invisible opacity-0"
      } `}
    >
      <div className="flex flex-col bg-red p-4">
        <div className="mb-4">
          <h3>Official's Tag</h3>
          <input type="text" />
        </div>
        <div className="mb-4">
          <h3>Additional Tag</h3>
          <input type="text" />
        </div>
        <button>Confirm</button>
      </div>
    </div>
  );
}
