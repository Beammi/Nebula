import closeIcon from "../../public/images/close.png";
import Image from "next/image";
import Button from "./Button";

export default function AddPlaceModal(props) {
  const { toggle, action, onAddPlace } = props;
  const isOpen = toggle;

  return (
    <div
      className={`ease-in duration-300 ${
        isOpen ? "visible opacity-100 drop-shadow-2xl" : "invisible opacity-0"
      }`}
    >
      <div className="flex flex-col rounded-lg text-black ml-2 bg-dark-grey">
        <Button
          buttonStyle=" bg-dark-grey p-2 py-0 outline-none w-full"
          type="button"
          label="Add place"
          onClick={() => {
            action();
            onAddPlace();
          }}
        ></Button>
        <Button
          buttonStyle=" bg-dark-grey p-2 pb-4 outline-none w-full"
          type="button"
          label="Add waypoint"
          onClick={() => {
            action();
            onAddPlace();
          }}
        ></Button>
      </div>
    </div>
  );
}
