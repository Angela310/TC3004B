const estudiante = {
    nombre: 'Angela',
    apellido: 'Aguirre',
    edad: 20,
    semestre: 6,
    carrera: 'ITC',
    direccion: {
        calle: 'Av. Universidad',
        numero: 3000,
}
};

console.table(estudiante)
console.log(estudiante);

const estudiante2 = {...estudiante};
estudiante2.nombre = 'Liz';
console.log(estudiante2);
console.log(estudiante);