import { useEffect } from "react"
import { useState } from "react"

export const Countdown = () => {
    const [countdown, setCountdown] = useState();
    
  return (
    <div>{countdown}</div>
  )
}
