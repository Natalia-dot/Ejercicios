

export const ButtonNumberComponent = ({setState, state, text}) => {
  console.log(state)
    return (
      <button onClick={()=> setState((prevState)=> prevState + 1 )}>{text}{state}</button>
    )
  }