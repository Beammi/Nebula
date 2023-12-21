// Add comment
import React from "react"

interface IButton {
    buttonStyle?: string
    label?: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FunctionComponent<IButton> = ({ buttonStyle, label, onClick }) => {
    return(
        <div className="pt-4">
            <button className={`${buttonStyle}`} onClick={onClick}>{label}</button>
        </div>
    )
}

export default Button