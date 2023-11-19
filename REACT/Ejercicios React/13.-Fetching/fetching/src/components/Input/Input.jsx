
import { useFetch } from "../../services/useFetch"
import "./Input.css"

export const Input = () => { 
    const {input, setInput} = useFetch();
    
  return (
    <input type="text" value={input} onChange={(e)=> setInput(e.target.value)}></input>
  )
}
