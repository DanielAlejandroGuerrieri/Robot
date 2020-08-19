# Robot
  
Proyecto robot

Ante la consigna de hacer mover a un robot por una cuadricula infinita, dada una posición inicial,
calcular la distancia maxima alcanzada por el robot desde su inicio. Los datos de comandos estan
todos cargados en el archivo 'comandos.txt', resolviendo el requerimiento para la descomposición
y armado de arreglos separados en obstaculos y movimientos.

Atravéz de el archivo app.js, se cumple con la consigna asignada y corre solamente por consola, 
ingresando a la ruta y ejecutando el comando:

>robot/config/node app.js

Se muestra en pantalla la captura de comandos se realiza desde el archivo con ruta:

>robot/public/comandos.txt


Desde el archivo server.js, se comienza a escuchar pedidos a 'localhost:8000' , 
con ruta:'/robot'. Quedando así una pequeña API REST donde devuelve a la pantalla del navegador
el resultado del calculo de máxima distancia. 

Para ejecutar el archivo server.js, se debe ingresar a la ruta:
>robot/config/node server.js
Desde donde llama a un archivo 'robot/controllers/comandoController.js', quién realiza los pedidos y ejecuciones
de modificaciones del modelo, que se encuentra en 'robot/models/robot.js'.
El archivo robot.js, es el modelo realizado como una clase para ser llamado desde el controller y así
mantener modularizado el proyecto.
