import { useRef } from "react"


export const TextRef = () => {
    const inputRef = useRef(null)

    const setFocused = () => {
        inputRef.current && inputRef.current.focus();
    }
  return (
    <div>
        <input type="text" ref={inputRef}></input>
        <button onClick={setFocused}>Push to focus</button>
    </div>
  )
}
