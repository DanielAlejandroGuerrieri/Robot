//Use path.ioin(__dirname, '/start.html');

var fs = require('fs'),
    path = require('path'),
    filePath = path.join('../comandos.txt');

//controller = require('../controllers/controller')
let arrayDatos = [];

fs.readFile(filePath, 'utf-8', function(err, data) {
    if (err) throw err;
    console.log('el contenido es: ' + data);
    //realizo la descomposicion del texto a un array dividido por los saltos de linea
    arrayDatos = data.split('\r\n');

    //controller.cargaDatos(arrayDatos);


    //cargo la cantidad de obstaculos extraidos de la entrada
    var cantObstaculos = arrayDatos[0][0];
    var obstaculos = [];

    // cargo la cantidad de movimientos extraidos de la entrada
    var cantMovimientos = arrayDatos[0][1];
    var movimientos = [];

    var norte = [0, 1];
    var sur = [0, -1];
    var este = [1, 0];
    var oeste = [-1, 0];
    var orientacion = norte;

    var posicionInicial = [0, 0];
    var posicionActual = posicionInicial;


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
    //console.log(movimientos);

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



    function moverRobot(pasos) {
        for (let i = 0; i < posicionActual.length; i++) {

            if (obstaculos === posicionActual) {
                console.log('hay un obstaculo');
                return
            }
            posicionActual.forEach((orientacion[i] * pasos));
            console.log(posicionActual);
        }
    }

    function moverRobot1(pasos) {
        let array = [];
        let choco = false;
        if (choco === false) {

            for (let i = 0; i <= pasos; i++) {

                var antesDeChocar = array;

                if (hayObstaculo(array)) {
                    choco = true;
                    return;
                } else {

                    for (let j = 0; j < posicionActual.length; j++) {

                        array[j] = posicionActual[j] + orientacion[j] * i; //posicionActual=[0,0]>[0,1]

                    }
                }

            }
            posicionActual = antesDeChocar;
        }
        console.log('este valor es del array: ' + array);

        console.log('este valor es del antes de chocar: ' + antesDeChocar);
        posicionActual = array;

        /*
        
        console.log(posicionActual);

            if (posicionActual == obstaculos[0]) {
                console.log('choco');
                posicionActual = array;
                return
            }
        
        let cantidad = 0;
        let posicion = [];
        for (let i = 0; i < pasos; i++) {
            cantidad++;
            posicion = posicionActual[j] + orientacion[j] * cantidad;
            
        }

        posicion = posicionActual;*/

    }



    function hayObstaculo(posicion) {
        //console.log(obstaculos.indexOf(posicionActual));

        for (let i = 0; i < obstaculos.length; i++) {
            //for (let j = 0; j < posicion.length; j++) {

            /*if (obstaculos[i][j] === posicion[j]) {
                console.log('hay obstaculo');
                return true;
            }
            */
            if (posicion[0] == obstaculos[i][0]) {
                if (posicion[1] == obstaculos[i][1]) {
                    console.log('choco');
                    // posicionActual = antesDeSumar;
                    return true;
                }
            }
            //}
        }
        return false;
    }

    movimientos.forEach(mover => {
        switch (mover[0]) {
            case 'M':
                let pasos = parseInt(mover[1]);
                moverRobot1(pasos);
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

    console.log('valor de los obstaculos: ' + obstaculos);
    console.log('esta es la posicion final: ' + posicionActual);

});