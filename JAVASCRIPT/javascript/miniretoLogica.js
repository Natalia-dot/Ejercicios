//1. Crea una variable llamada **`planet`** y asígnale el valor "Tierra"
//2. Crea una variable llamada **`isInnerPlanet`** y asígnale el valor **`true`** (la Tierra es un planeta interno)
//3. Crea una variable llamada **`hasAtmosphere`** y asígnale el valor **`true`** (la Tierra tiene atmósfera)
//4. Utiliza un operador lógico **`&&`** (AND) para combinar las variables **`isInnerPlanet`** y **`hasAtmosphere`** en una expresión lógica que evalúe a **`true`**. Almacena el resultado en una variable llamada **`isHabitable`**.
//5. Utiliza una declaración **`console.log`** para imprimir el valor de la variable **`isHabitable`** en la consola. Debería mostrarse **`true`**.

let planet = "Tierra";
let isInnerPlanet = true;
let hasAtmosphere = true;
let isHabitable = isInnerPlanet && hasAtmosphere
isInnerPlanet && hasAtmosphere ? console.log(isHabitable) : console.log(isHabitable);

let planet1 = "Tierra";
let isInnerPlanet1 = false;
let hasAtmosphere1 = true;
let isHabitable1 = isInnerPlanet1 && hasAtmosphere1
console.log(isHabitable1);




/* let myObj = {}
myObj.key1 = "param 1";
myObj.key2 = "param 2";
console.log(myObj); */
