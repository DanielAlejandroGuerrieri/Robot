const Robot = require('../models/robot');

let arrayDatos = [];
let direccion = {
    norte: [0, 1],
    sur: [0, -1],
    este: [1, 0],
    oeste: [-1, 0]
};

//Creo el robot con su posicion inicial
let robot = new Robot([0, 0]);


function iniciar(data) {

    //realizo la descomposicion del texto a un array dividido por los saltos de linea
    arrayDatos = data.split('\r\n');
    console.log(robot);

    //determino la cantidad de obstaculos
    let cantObstaculos = arrayDatos[0][0];
    let obstaculos = [];

    let movimientos = [];

    //ingreso de coordenadas de obstaculos y luego los movimientos
    for (let i = 1; i <= cantObstaculos; i++) {
        let arrayInt = [];
        let arrayString = arrayDatos[i].split(' ');
        for (var j = 0; j < 2; j++) {
            arrayInt.push(parseInt(arrayString[j]));
        }
        obstaculos.push(arrayInt);
    }


    //A diferencia de los obstaculos, aquí queda un array de el tipo de movimiento y la cantidad de pasos cuando se especifica 
    for (let j = cantObstaculos.length + 1; j < arrayDatos.length; j++) {
        movimientos.push(arrayDatos[j].split(' '));
    }



    movimientos.forEach(mover => {
        switch (mover[0]) {
            case 'M':
                let pasos = parseInt(mover[1]);
                robot.mover(pasos, obstaculos);
                robot.mayorDistancia();
                break;
            case 'L':
                robot.cambiarDireccion('L');
                break;
            case 'R':
                robot.cambiarDireccion('R');
                break;

            default:
                break;
        }

    });

    return robot.calcularMaximaDistancia();
}

module.exports = {
    iniciar: iniciar,
    robot: robot
};