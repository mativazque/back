const Container = require("../models/class");
const HttpError = require("../models/http-error");

// Traemos lo creado de la carpeta models .
let container = new Container("products.json");

const getAllProducts = async (req, res, next) => {
  let products;

  try {
    products = await container.getAll();
  } catch (err) {
    const error = new HttpError(
      "Carga fallida, porfavor intente de nuevo.",
      500
    );
    return next(error);
  }

  
  if (!products) {
    const error = new HttpError("Nose se puedo encontrar ningun producto", 404);
    return next(error);
  }

  res.send(products);
};

const getProductById = async (req, res, next) => {
  const productId = req.params.id; 
  let product;

  try {
    product = await container.getById(productId);
  } catch (err) {
    const error = new HttpError(
      "Carga fallida, porfavor intente de nuevo.",
      500
    );
    return next(error);
  }

  if (!product) {
    const error = new HttpError(
      "No se encontro ningun producto con ese id.",
      404
    );

    return next(error);
  }

  res.send(product);
};

const createProduct = async (req, res, next) => {
  const { title, price, thumbnail } = req.body;
  let newProduct;

  try {
    newProduct = await container.save({ title, price, thumbnail });
  } catch (err) {
    const error = new HttpError(
      "Creacion de producto fallida, porfavor intente de nuevo.",
      500
    );

    return next(error);
  }

  res.status(201).json(newProduct);
};

const updateProduct = async (req, res, next) => {
  const { title, price, thumbnail } = req.body;
  const productId = req.params.id;

  let product, contentFile;
  try {
    await container.deleteById(Number(productId));

    contentFile = await container.getAll();
  } catch (err) {
    const error = new HttpError(
      "Algo salio mal, no se puede encontrar ese producto",
      500
    );
    return next(error);
  }

  // Estructura del nuevo producto
  product = {
    title,
    price,
    thumbnail,
    id: Number(productId),
  };

  contentFile.push(product);

  try {
    await container.updateFile(contentFile);
  } catch (err) {
    const error = new HttpError(
      "Algo salio mal, no se puede actualizar ese producto",
      500
    );
    return next(error);
  }

  res.status(200).json(product);
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;

  try {
    await container.deleteById(Number(productId));
  } catch (err) {
    const error = new HttpError(
      "Algo salio mal, no se puede eliminar ese producto.",
      500
    );

    return next(error);
  }

  res.status(200).json({ message: "Producto Eliminado" });
};

exports.getProductById = getProductById;
exports.getAllProducts = getAllProducts;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;