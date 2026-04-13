const myArray = [1, 2, 3, 4, 5];

myArray.push(6); // Adds 6 to the end of the array
console.log(myArray); // Output: [1, 2, 3, 4, 5, 6]

myArray.pop();
console.log(myArray); // Output: [1, 2, 3, 4, 5]

// SEMANA 2

let a,b, rest;

[a,b] = [10,20];
console.log(b);

[a,b,...rest] = [10,20,30,40,50];
console.log(rest);