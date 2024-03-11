const prompt=require('prompt-sync')();

let age = prompt("Enter your Age:");
age=Number.parseInt(age)
console.log(age>=18?"Eligible":"Not Eligible")