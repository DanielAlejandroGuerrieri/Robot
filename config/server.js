var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    comandoControllers = require('../controllers/comandoControllers'),
    filePath = path.join('../public/comandos.txt');


var app = express();

app.get('/robot', function(req, res) {

    fs.readFile(filePath, 'utf-8', function(err, data) {
        if (err) throw err;
        console.log('el contenido es: ' + data);
        let distancia = comandoControllers.iniciar(data);
        res.send('La distancia maxima alcanzada por el robot con posicion inicial en [' + comandoControllers.robot.posicionInicial + '], es: ' + distancia);
    });
});


app.listen(8000, function() {
    console.log('Escuchando pedidos en el puerto 8000');
});