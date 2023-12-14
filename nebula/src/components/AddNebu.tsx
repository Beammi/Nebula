export default function AddNebu(props) {
  const addNebuState = props.toggle;
    const action = props.action
  return (
    <div
      className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-all ease-in duration-500 ${
        addNebuState ? "opacity-100 drop-shadow-2xl" : "rounded-sm opacity-0"
      } `}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={action}>Close</button>
          </form>
        </div>
      </div>
    </div>
  );
}
