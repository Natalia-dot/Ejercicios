import "./Error.css"

export const Error = (hasError) => {
  return (
    <div className="error" >An error ocurred! {hasError.toString()} </div>
  )
}
