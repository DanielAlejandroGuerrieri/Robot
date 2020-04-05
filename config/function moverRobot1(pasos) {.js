function moverRobot1(pasos) {
    let array = []; //temporal
    //let choco = false;

    //if (choco === false) {
    for (let i = 0; i < pasos; i++) {
        if (hayObstaculo(array)) {
            choco = true;
            return;
        }
        for (let j = 0; j < posicionActual.length; j++) {
            array[j] = posicionActual[j] + orientacion[j] * i; //posicionActual=[0,0]>[0,1]
        }

        //  }
        posicionActual = antesDeChocar;
    }
    console.log('este valor es del array: ' + array);
    console.log('este valor es del antes de chocar: ' + antesDeChocar);
    posicionActual = array;
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