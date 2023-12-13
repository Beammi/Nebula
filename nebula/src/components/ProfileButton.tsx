import { useState } from "react"

interface IProfileButton {
    text?: string
  }
  
  const ProfileButton: React.FunctionComponent<IProfileButton> = ({ text }) => {
    const colors = ['bg-blue','bg-red','bg-yellow','bg-dark-grey']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    const [IsOpen, setIsOpen] = useState(false)
    return (
        <div className="p-4">
          <button className={`btn btn-circle text-white ${randomColor} p-4`} onClick={() => setIsOpen(!IsOpen)}>
            {text}
          </button>
          <div className={`flex flex-col bg-white absolute right-12 p-8 shadow-lg rounded-lg opacity-0 top-24 transition-all ease-in duration-200 ${IsOpen ? 'opacity-100' : 'right-[-200px]'}`}>
              <ul className="flex flex-col gap-4 text-[black]">
                  <li>Profile</li>
                  <li>Your Nebu</li>
                  <li>Your Tour</li>
                  <li>Setting</li>
              </ul>
          </div>
        </div>
      
    )
  }
  export default ProfileButton
  