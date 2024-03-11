console.log('hello world')

let smth=()=>{
    console.log("smth")
}
const hello=()=>{
    console.log("Hello World")
}
smth();
hello();

function addnumbers(a,b,c){
     return a+b+c;
}
console.log(addnumbers(21,2,2))

let x='string'
console.log(x)
x=2; console.log(x) 

let freebee=undefined

console.log(freebee)

let boolean=true
console.log(boolean)

// Primtive DataTypes: String Symbol Number null Boolean BigInt Undefined
// Non-Primitive DataTypes: Js Objects (Like Maps in Dart)

const object={
    "name":'Dawood',
    "Age":20,
    Job:undefined
}

console.log(object['name'])
console.log(object.name)
console.log(object["Job"]+" "+object.Job)
