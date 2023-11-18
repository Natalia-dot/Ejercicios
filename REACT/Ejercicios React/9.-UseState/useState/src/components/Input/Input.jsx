import "./Input.css"

export const Input = ({value, func}) => {
  return (
    <input type="text" value={value} onChange={(e) => func(e.target.value)}></input>
  )
}
