const express = require("express");
const productsRoutes = require("./routsProducts")
const app = express();


const PORT = 8080;

// Aceptar la data en formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para el cuestionario(index)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use("/api/productos", productsRoutes);


const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`)
})

server.on(`Error:`, error => console.log(error));


