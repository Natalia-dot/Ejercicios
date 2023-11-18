import "./Input.css"

export const Input = ({name, favBooks, favFilms, data, setData}) => {
  return (
    <div>
    <input type="text" placeholder="Katniss" value={name} onChange={(e) => setData({...data, name: e.target.value})}></input>
    <input type="text" placeholder="The Hunger Games" value={favBooks} onChange={(e) => setData({...data, favBooks: e.target.value})}></input>
    <input type="text" placeholder="Mockingjay" value={favFilms} onChange={(e) => setData({...data, favFilms: e.target.value})}></input>
    </div>
  )
}
