const direccion = {
    norte: [0, 1],
    sur: [0, -1],
    este: [1, 0],
    oeste: [-1, 0]
};


const Robot = function(posicionInicial) {
    this.posicionInicial = posicionInicial;
    this.posicionActual = this.posicionInicial;
    this.posicionMaxima = [];
    this.orientacion = direccion.norte;
}

Robot.prototype.mover = function(pasos, obstaculos) {
    let futuraPosicion = []; //temporal
    let choco = false;
    for (var i = 1; i <= pasos; i++) {
        futuraPosicion = this.sumarPasos(i);
        if (this.hayObstaculo(futuraPosicion, obstaculos)) {
            choco = true;
            break;
        }
    }
    this.posicionActual = choco ? this.sumarPasos(i - 1) : this.sumarPasos(pasos);
    //actualizo la mayor distancia alcanzada
    this.mayorDistancia();
}

Robot.prototype.cambiarDireccion = function(caso) {
    switch (this.orientacion) {
        case direccion.norte:
            if (caso === 'L') { this.orientacion = direccion.oeste }
            if (caso === 'R') { this.orientacion = direccion.este }
            break;
        case direccion.sur:
            if (caso === 'L') { this.orientacion = direccion.este }
            if (caso === 'R') { this.orientacion = direccion.oeste }
            break;
        case direccion.este:
            if (caso === 'L') { this.orientacion = direccion.norte }
            if (caso === 'R') { this.orientacion = direccion.sur }
            break;
        case direccion.oeste:
            if (caso === 'L') { this.orientacion = direccion.sur }
            if (caso === 'R') { this.orientacion = direccion.norte }
            break;
        default:
            break;
    }

}

Robot.prototype.sumarPasos = function(cantidad) {
    let posicion = [];
    for (let j = 0; j < this.posicionActual.length; j++) {
        posicion[j] = this.posicionActual[j] + this.orientacion[j] * cantidad; //posicionActual=[0,0]>[0,1]
    }
    return posicion;
}

Robot.prototype.hayObstaculo = function(posicion, obstaculos) {
    let cantidadObstaculos = obstaculos.length;
    for (let i = 0; i < cantidadObstaculos; i++) {
        if (posicion[0] == obstaculos[i][0]) {
            if (posicion[1] == obstaculos[i][1]) {
                return true;
            }
        }
    }
    return false;
}

Robot.prototype.mayorDistancia = function() {

    let temporal = [];
    for (let i = 0; i < 2; i++) {
        if (this.posicionActual[i] < 0) {
            temporal[i] = this.posicionActual[i] * -1;
        }
        if (this.posicionActual[i] >= this.posicionMaxima[i]) {
            this.posicionMaxima[i] = this.posicionActual[i];
        } else if (temporal[i] >= this.posicionMaxima[i]) {
            this.posicionMaxima[i] = temporal[i];
        }
    }
}

Robot.prototype.calcularMaximaDistancia = function() {
    let x = Math.pow(this.posicionMaxima[0], 2);
    let y = Math.pow(this.posicionMaxima[1], 2);
    let distancia = Math.sqrt(x + y);
    distancia = Number(distancia.toFixed(2));
    return distancia;
}

module.exports = Robot;