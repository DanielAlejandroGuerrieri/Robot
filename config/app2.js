//var http = require("http");
var fs = require("fs");
var comandos = "comandos.txt";

let lector = readline.createInterface({
    input: fs.createReadStream(comandos)
});

lector.on("", linea => {
    console.log("Tenemos una linea: ", linea);
});

fs.readFile(comandos, (error, datos) => {
    if (error) throw error;
    console.log('el contenido es: ' + datos);
});