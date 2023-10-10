interface IText {
    text?: string
    style?: string
}

const P: React.FunctionComponent<IText> = ({ style, text }) => {
  return (
    <p
      className={`text-sm text-left md:text-justify sm:text-base md:text-lg lg:text-xl 2xl:text-2xl ${style}`}
    >
      {text}
    </p>
  )
}
export default P