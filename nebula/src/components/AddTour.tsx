import Image from "next/image";
import close from "../../public/images/close.png";

export default function AddTour(props) {
  const addTourState = props.toggle;
  const action = props.action;

  return (
    <div
      className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-all ease-in duration-500 ${
        addTourState
          ? "visible opacity-100 drop-shadow-2xl"
          : "rounded-sm invisible opacity-0"
      } `}
    >
      <div className=" bg-white font-bold modal-box w-screen text-black">
        <div className="flex justify-end mb-2">
          <button onClick={action}>
            <Image src={close} alt="clsbtn" className="pt-2" width={20} />
          </button>
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg">Tour name</h3>
          <input
            type="text"
            className="p-2 bg-grey rounded-md focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue"
          />
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="text-lg">Description</h3>
          <textarea
            name="postContent"
            rows={5}
            cols={40}
            className="p-2 resize-none bg-grey rounded-md focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue"
          />
        </div>
      </div>
    </div>
  );
}
