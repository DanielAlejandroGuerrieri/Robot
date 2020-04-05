var cargaDatos = function(dato) {

    //cargo la cantidad de obstaculos extraidos de la entrada
    var cantObstaculos = dato[0][0];
    var obstaculos = [];

    // cargo la cantidad de movimientos extraidos de la entrada
    var cantMovimientos = dato[0][1];
    var movimientos = [];

    //ingreso a una variable las coordenadas de obstaculos y luego los movimientos
    for (let i = 1; i <= cantObstaculos; i++) {
        obstaculos.push(dato[i].split(' '));
    }
    console.log(obstaculos);

    //A diferencia de los obstaculos, aquí queda un array de el tipo de movimiento y la cantidad de pasos cuando se especifica 
    for (let j = cantObstaculos.length + 1; j < dato.length; j++) {
        movimientos.push(dato[j].split(' '));

    }
    console.log(movimientos);
}

module.exports = {
    cargaDatos: cargaDatos
}