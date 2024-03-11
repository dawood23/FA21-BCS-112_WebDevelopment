//for in loop just like dart

const map={
    shabir:12,
    kabir:90,
    ahsan:30,
    shahwaiz:10,
    abdullah:1,
    homod:11
}

for(let i=0;i<Object.keys(map).length;i++){
    console.log(Object.keys(map)[i]+" "+map[Object.keys(map)[i]])
}

for(let a in map){
    console.log(a+" "+map[a])
}

let a="something"
let b="something also"

let sentence=`${a} "it is working here" ${b}`

console.log(sentence)