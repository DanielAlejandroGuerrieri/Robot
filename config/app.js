//Use path.ioin(__dirname, '/start.html');

var fs = require('fs'),
    path = require('path'),
    filePath = path.join('../comandos.txt');

let arrayDatos = [];

fs.readFile(filePath, 'utf-8', function(err, data) {
    if (err) throw err;
    console.log('el contenido es: ' + data);
    //realizo la descomposicion del texto a un array dividido por los saltos de linea
    arrayDatos = data.split('\r\n');

    //cargo la cantidad de obstaculos extraidos de la entrada
    var cantObstaculos = arrayDatos[0][0];
    var obstaculos = [];

    // cargo la cantidad de movimientos extraidos de la entrada
    var movimientos = [];

    var norte = [0, 1];
    var sur = [0, -1];
    var este = [1, 0];
    var oeste = [-1, 0];
    var orientacion = norte;

    var posicionInicial = [0, 0];
    var posicionActual = posicionInicial;
    var posicionMaxima = [0, 0]; //inicializo la posicionMaxima al valor de posicionInicial


    //ingreso a una variable las coordenadas de obstaculos y luego los movimientos

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

    function direccion(caso) {
        switch (orientacion) {
            case norte:
                if (caso === 'L') { orientacion = oeste }
                if (caso === 'R') { orientacion = este }
                break;
            case sur:
                if (caso === 'L') { orientacion = este }
                if (caso === 'R') { orientacion = oeste }
                break;
            case este:
                if (caso === 'L') { orientacion = norte }
                if (caso === 'R') { orientacion = sur }
                break;
            case oeste:
                if (caso === 'L') { orientacion = sur }
                if (caso === 'R') { orientacion = norte }
                break;
            default:
                break;
        }

    }


    function mayorDistancia() {
        let temporal = [];
        for (let i = 0; i < 2; i++) {
            if (posicionActual[i] < 0) {
                temporal[i] = posicionActual[i] + -1;
            }
            if (posicionActual[i] >= posicionMaxima[i]) {
                posicionMaxima[i] = posicionActual[i];
            }
        }
        console.log('la posicion Maxima es: ' + posicionMaxima);
    }

    function calcularMaximaDistancia() {
        let x = Math.pow(posicionMaxima[0], 2);
        let y = Math.pow(posicionMaxima[1], 2);
        let distancia = Math.sqrt(x + y);
        distancia = Number(distancia.toFixed(2));
        return distancia;
    }

    function moverRobot(pasos) {
        let nuevaPosicion = []; //temporal
        let choco = false;
        for (let i = 1;
            (i <= pasos) && (choco === false); i++) {
            for (let j = 0; j < posicionActual.length; j++) {
                nuevaPosicion[j] = posicionActual[j] + orientacion[j] * i; //posicionActual=[0,0]>[0,1]
            }
        }
        if (hayObstaculo(nuevaPosicion)) {
            choco = true;
            return;
        }
        console.log('este valor es del antes de chocar: ' + posicionActual);
        console.log('este valor es del nuevaPosicion: ' + nuevaPosicion);
        posicionActual = nuevaPosicion;
    }

    function hayObstaculo(posicion) {
        for (let i = 0; i < obstaculos.length; i++) {
            if (posicion[0] == obstaculos[i][0]) {
                if (posicion[1] == obstaculos[i][1]) {
                    console.log('choco');
                    return true;
                }
            }
        }
        return false;
    }

    movimientos.forEach(mover => {
        switch (mover[0]) {
            case 'M':
                let pasos = parseInt(mover[1]);
                moverRobot(pasos);
                mayorDistancia();
                break;
            case 'L':
                direccion('L');
                break;
            case 'R':
                direccion('R');
                break;

            default:
                break;
        }

    });
    console.log('esta es la posicion final: ' + posicionActual);
    console.log('La distancia maxima alcanzada es: ' + calcularMaximaDistancia() + ' unidades');

});