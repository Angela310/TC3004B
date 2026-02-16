function saludar(nombre:string):string{
    return `hola ${nombre}`
}

// tambien podriamos hacer una funcion tiupo flecha

const saludarFlecha = (nombre:string):string => {
    return `hola ${nombre}`
}

const mdg = saludar('Jorge');
const mdg2 = saludarFlecha('Angela');

console.log(mdg);
console.log(mdg2);  