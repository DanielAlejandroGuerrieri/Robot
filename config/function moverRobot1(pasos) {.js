function moverRobot(pasos) {
    let nuevaPosicion = []; //temporal
    let choco = false;

    for (let i = 0;
        (i <= pasos) || (choco === true); i++) {
        for (let j = 0; j < posicionActual.length; j++) {
            nuevaPosicion[j] = posicionActual[j] + orientacion[j] * i; //posicionActual=[0,0]>[0,1]
        }


        if (hayObstaculo(nuevaPosicion)) {
            choco = true;
            return;
        }
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