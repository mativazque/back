const container = require("./manejador");

const productos = new container("./data.json")

productos.fileSave({ id: undefined, title: 'Auriculars', price: '110' });

//Los restantes métodos fueron testeados:
// productos.getById(2);
// productos.getAll();
// productos.deleteById(1);
// productos.deleteAll();

