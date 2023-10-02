const duplicates = [
    'sushi',
    'pizza',
    'burger',
    'potatoe',
    'pasta',
    'ice-cream',
    'pizza',
    'chicken',
    'onion rings',
    'pasta',
    'soda'
  ];

  
  function removeDuplicates(arr) {
    const duplicates0 = [];
    for (let i = 0; i < arr.length; i++){
      !duplicates0.includes(arr[i]) ? duplicates0.push(arr[i]) : null;
      console.log (duplicates0)
    }
    return duplicates0
  }
  console.log(removeDuplicates(duplicates))
    //iterar sobre el array con un loop
    //por cada elemento del array, tiene que iterar por el noDuplicates para ver si ya esta
    //si no esta, se introduce en el array
    //si esta, no se introduce
    //lo intento hacer con forof y con includes