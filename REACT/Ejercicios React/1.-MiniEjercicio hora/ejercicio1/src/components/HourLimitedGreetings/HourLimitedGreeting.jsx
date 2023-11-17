export const HourLimitedGreeting = ({hour}) => {

  return (
    <h1> {hour >= 6 && hour <= 12 ? "Buenos dias" : hour >= 13 && hour <= 19 ? "Buenas tardes" : hour >= 19 && hour <= 24 || hour >= 0 && hour <= 5 ? "Buenas noches" : null} </h1>
  )
}
