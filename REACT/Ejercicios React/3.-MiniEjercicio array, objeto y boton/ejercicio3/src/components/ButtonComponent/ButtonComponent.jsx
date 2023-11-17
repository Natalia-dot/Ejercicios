

export const ButtonComponent = ({state, setState, text}) => {
  console.log(state)
  return (
    <button onClick={()=> setState((state)=> !state)}>{text}</button>
  )
}
