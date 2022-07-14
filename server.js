const container = require("./manejador.js");
const productos = new container("./products.json")

express = require("express");
const app = express();


const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`)
})

app.get("/productos", async (req, res) => {
    productos.getAll()
        .then((data) => res.send(data))
})

app.get("/productoRandom", (req, res) => {
    productos.getRandom()
        .then((data) => res.send(data))
})



server.on(`Error:`, error => console.log(error));


