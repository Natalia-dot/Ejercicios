import { useFetch } from "../../services/useFetch"
import "./Input.css"

export const Input = () => { 
    const {input, handleInputChange} = useFetch();
  return (
    <input type="text" value={input} onChange={(e)=> handleInputChange(e.target.value)}></input>
  )
}
