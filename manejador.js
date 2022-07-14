const fs = require("fs")

class container {
    constructor(fileName) {
        this.file = fileName;
    }

    //GUARDAR ITEM
    async fileSave(file) {
        try {
            //Leo el archivo, si existe lo guardo en una variable
            const reading = JSON.parse(
                await fs.promises.readFile(this.file, "utf-8")
            )

            //Si existe el archivo, se lee el último Id y se le agrega uno más al id del nuevo item
            file.id = reading[reading.length - 1].id + 1

            //Agrego el nuevo producto actualizado a la variable
            reading.push(file);

            //Se sobreescribe el archivo con el nuevo producto incluído
            await fs.promises.writeFile(this.file, JSON.stringify(reading));
            console.log("Tu producto ha sido agregado exitosamente")

            //Devuelvo el id del último item agregado
            console.log("El id del item agregado es:", file.id)
        }
        //Leo el error
        catch (error) {
            console.log("Error:", error)

            //Si el error es xq no existe el archivo, lo creo y asigno id=1 al item adicionado
            if (error.errno === -4058) {
                file.id = 1;
                await fs.promises.appendFile(this.file, JSON.stringify([file]))
            }
        }
    }

    async getById(id) {
        try {
            //Leo el archivo, si existe lo guardo en una variable
            const reading = JSON.parse(
                await fs.promises.readFile(this.file, "utf-8")
            )

            //busco el objeto por y lo guardo en una variable
            const itemWanted = reading.find((item) => (item.id === id))

            //Si el id buscado no existe
            if (itemWanted === undefined) {
                console.log(`No hay items con el id ${id}`)
            }

            //Si existe el id buscado
            else {
                console.log("Item encontrado:", itemWanted);
            }
        }
        catch (error) {
            console.log("Error:", error)
            if (error.errno === -4058) {
                console.log(`No existe archivo "data.json"`)
            }
        }
    }


    async getAll() {
        try {
            //Leo el archivo, si existe lo guardo en una variable
            const reading = JSON.parse(
                await fs.promises.readFile(this.file, "utf-8")
            )
            return reading
        }
        catch (error) {
            console.log("Error:", error)
            if (error.errno === -4058) {
                console.log(`No existe archivo "data.json"`)
            }
        }
    }

    async deleteById(id) {
        try {
            //Leo el archivo, si existe lo guardo en una variable
            const reading = JSON.parse(
                await fs.promises.readFile(this.file, "utf-8")
            )

            //Filtro por ids diferentes al buscado y guardo en otra variable
            const newData = reading.filter((item) => item.id != id)

            //Se sobreescribe el archivo con sin el elemento borrado
            await fs.promises.writeFile(this.file, JSON.stringify(newData));
            console.log("Elementos actualizados:", newData)
        }
        //Leo el error
        catch (error) {
            console.log("Error:", error)
            if (error.errno === -4058) {
                console.log(`No existe archivo "data.json"`)
            }
        }
    }

    async deleteAll() {
        try {
            //Se sobreescribe el archivo con sin elementos
            await fs.promises.writeFile(this.file, JSON.stringify([]));
            console.log("Elementos eliminados exitosamente")
        }
        //Leo el error
        catch (error) {
            console.log("Error:", error)
            if (error.errno === -4058) {
                console.log(`No existe archivo "data.json"`)
            }
        }
    }

    async getRandom() {
        const product = await this.getAll()
            .then((products) => products[Math.floor(Math.random() * products.length)])
        return product
    }
}


module.exports = container;