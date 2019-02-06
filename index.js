// El primer paso es crear un proyecto vacío y en la terminal iniciar $npm init.
// Luego instalar express con el comando npm install express --save
// Importando express
const express = require('express');
const app = express();
// bodyParser transforma el texto en json
const bodyParser = require('body-parser');

const todo = [];

// $ npm install --save body-parser (middleware)
app.use(bodyParser.json());

// next da el paso a la siguiente función
app.use(function(request, response, next){
    const porfavor = request.query.porfavor;
    console.log("Holo > "+JSON.stringify(porfavor));
    if(!porfavor){
        // http://localhost:3000/send
        // 403 = prohibido (se está prohibiendo el acceso a la api)
        response.status(403);
        // return corta la ejecución de la función
         return response.send("You have been rude! Cannot access to my api")
    }
    // Si el usuario fue amable se puede pasar a la función de la ruta o del middleware
    // http://localhost:3000/send?porfavor=true
    next();
});

// get es para pedir información sin modificarla
app.get('/hello', function (req, res) {
    res.send('Hello World!');
});
// la dirección sería localhost:3000/hello
app.get('/bye', function (req, res) {
    res.send('Bye bye!');
});
// Lo que va después del puerto 3000 es la ruta, cada ruta corresponde a una función que se ejecuta

// Para echar a correr en el navegador, promero se escribe en la terminal $node index.js (nombre del archivo js) y luego en el navegador localhost:3000 más la ruta, por ejemplo localhost:3000/hello

// post es un método que sirve para cuando queremos enviar datos o queremos modificar cosas que están en el servidor, por ejemplo cuando queremos llenar un formulario y enviarlo. Cuando usamos https,el mensaje queda encriptado y nadie más lo puede ver


// www.getpostman.com --> download, permite probar apis
// También sirve la extensión REST client
// En Method poner POST y en Request URL poner http://localhost:3000/send. En el body poner el contenido del mensaje en formato json
// En Header name poner content-type y en Header value poner application/json --> click en SEND
// En la terminal debería aparecer el contenido del mensaje

/*                  
Request ---> auth() ---> function(ruta) ---
                                           |
                                           |                          
Response  <---  error()                <---
                                
*/

app.post('/send', function (request, response) {
    // Vamos a mostrar todo lo que envió la persona a través de body
    console.log("Request > "+JSON.stringify(request.body));
    response.send('Data received!');
});
// request recibe la información del usuario, response es la información que le enviamos de vuelta 

// CREAR
// put se utiliza cuando se quiere modificar un dato de la base de datos
//http://localhost:3000/todo/create?porfavor=true
app.post('/todo/create', function(request, response){
    // Al arreglo todo vamos a poner todo lo que llega a través del boy de la petición
    todo.push(request.body);
    console.log(JSON.stringify(todo));
    response.send(`Todo created ${todo.lenght - 1}`); // Posición en la que quedó el arreglo
});

// BORRAR
// Delete se usa para modificar y borrar un elemento que está en el servidor
// http://localhost:3000/todo/1 --> ruta que queremos formar
app.delete('/todo/:id', function(request, response){
    todo.splice(parseInt(request.params.id), 1);
    console.log(JSON.stringify(todo));
    response.send("Todo deleted");
});

// Función que escucha por cada petición a través de un puerto (en espera de solicitudes)
app.listen(3000, function() { 
    console.log('Example app listening on port 3000!');
});