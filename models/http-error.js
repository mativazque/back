//creo una clase para los errores
class HttpError extends Error {
    //se pone un mensaje y el numero de error que le corresponde
    constructor(message, errorCode) {
      super(message); 
      this.code = errorCode;
    }
  }
  
  module.exports = HttpError;