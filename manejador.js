const fs = require("fs")

class container {
    constructor(fileName) {
        this.file = fileName;
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


    async getRandom() {
        const product = await this.getAll()
            .then((products) => products[Math.floor(Math.random() * products.length)])
        return product
    }
}


module.exports = container;