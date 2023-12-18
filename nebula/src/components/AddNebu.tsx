import Button from "./Button";

export default function AddNebu(props) {
  const addNebuState = props.toggle;
  const action = props.action;
  return (
    <div
      className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-all ease-in duration-500 ${
        addNebuState
          ? "visible opacity-100 drop-shadow-2xl"
          : "rounded-sm invisible opacity-0"
      } `}
    >
      <div className="modal-box bg-white w-screen">
        <form action="" className="text-black">
          <div className="flex flex-col">
            <h3 className="text-lg">Title</h3>
            <input type="text" className="p-2 bg-grey rounded-md focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue" />
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="text-lg">Description</h3>
            <textarea name="postContent" rows={5} cols={40} className="p-2 resize-none bg-grey rounded-md focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue" />
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="text-lg">Tags</h3>
            <Button buttonStyle="btn btn-primary bg-yellow w-fit" label="Add Nebu"></Button>
          </div> 
        </form>
      </div>
    </div>
  );
}
