
export const getData = async (setData) => {
    let characterData = await fetch (`https://botw-compendium.herokuapp.com/api/v3/compendium/category/monsters`)
    .then((res) => res.json());
    setData(characterData.data)
  }
