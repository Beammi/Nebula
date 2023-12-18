import Button from "./Button";
import Image from "next/image"
import plus from "../../public/images/plus.png"

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
            <Button buttonStyle="btn btn-primary bg-yellow w-fit border-none" label="#office"></Button>
          </div> 
          <div className="flex flex-col mt-4">
            <h3 className="text-lg">Image</h3>
            <button className=" bg-white rounded-3xl mt-2 hover:bg-red w-fit p-2"><Image src={plus} alt="plus" width={25} height={25} /></button>
          </div> 
          <div className="flex mt-4">
            <h3 className="text-lg">Time Limit</h3>
            <input type="button" className="bg-black text-black" placeholder="hello"></input>
          </div> 
        </form>
      </div>
    </div>
  );
}
