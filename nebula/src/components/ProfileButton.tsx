interface IProfileButton {
    text?: string
  }
  
  const ProfileButton: React.FunctionComponent<IProfileButton> = ({ text }) => {
    const colors = ['bg-blue','bg-red','bg-yellow','bg-dark-grey']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    return (
        <div className="p-4">
          <button className={`btn btn-circle text-white ${randomColor} p-4`}>
            {text}
          </button>
        </div>
      
    )
  }
  export default ProfileButton
  