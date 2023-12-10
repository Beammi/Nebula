// Add comment
import React from "react"

interface IButton {
    buttonStyle?: string
    label?: string
}

const Button: React.FunctionComponent<IButton> = ({ buttonStyle, label }) => {
    return(
        <div className="pt-4">
            <button className={`${buttonStyle}`}>{label}</button>
        </div>
    )
}

export default Button