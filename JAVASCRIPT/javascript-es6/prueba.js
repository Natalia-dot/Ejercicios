const obj1 = { firstName: 'Foo', age: 22 };
const obj2 = { lastName: 'Bar', gender: 'M' };

const newObj = { ...obj1, ...obj2, planet: 'Earth' };

console.log(newObj);


myArr = [1,2,3,4,5,6]
const prueba = (arr) => {
	return arr.shift()

}
console.log(prueba(myArr))
console.log(myArr)
