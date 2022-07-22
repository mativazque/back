const fs = require("fs");

class Container {
    constructor(fileName) {
        this.fileName = fileName;
    }

    save = async (obj) => {
        try {
            let data = await fs.promises.readFile(
                `./resources/${this.fileName}`,
                "utf-8"
            );

            if (data.length == 0) {
                obj.id = 1;

                // Creo un array primero para recrear un archivo JSON en products.txt
                await fs.promises.writeFile(
                    `./resources/${this.fileName}`,
                    JSON.stringify(new Array(obj))
                );

                return obj;
            } else {
                let fileContent = JSON.parse(data);

                // traigo el id maximo del array de objetos
                let maxId = fileContent.reduce((prev, curr) =>
                    prev.id > curr.id ? prev : curr
                );

                // le asigno un id al nuevo objeto
                obj.id = Number(maxId.id) + 1;
                // pusheo el nuevo objeto al array de objetos ya con el id máximo
                fileContent.push(obj);

                await fs.promises.writeFile(
                    `./resources/${this.fileName}`,
                    JSON.stringify(fileContent)
                );

                return obj;
            }
        } catch (err) {
            console.log(err);
        }
    };

    getById = async (id) => {
        try {
            let data = await fs.promises.readFile(
                `./resources/${this.fileName}`,
                "utf-8"
            );
            let content = JSON.parse(data);

            // filtro el id de objetos para encontrar el que tiene el mismo id
            let value = content.filter((item) => item.id == id);

            // si ese id no existe retorno null.
            return value.length ? value : null;
        } catch (err) {
            console.log(err);
        }
    };

    //creo la promesa para traer todos los productos(como lo hicimos en la clase 3 y 4)
    getAll = async () => {
        try {
            let data = await fs.promises.readFile(
                `./resources/${this.fileName}`,
                "utf-8"
            );

            return JSON.parse(data);
        } catch (err) {
            console.log(err);
        }
    };

    updateFile = async (content) => {
        try {
            await fs.promises.writeFile(
                `./resources/${this.fileName}`,
                JSON.stringify(content)
            );
        } catch (err) {
            console.log(err);
        }
    };

    deleteById = async (id) => {
        try {
            let data = await fs.promises.readFile(
                `./resources/${this.fileName}`,
                "utf-8"
            );
            let content = JSON.parse(data);
            // producto filtrado
            let contentEdited = content.filter((item) => item.id !== id);

            await fs.promises.writeFile(
                `./resources/${this.fileName}`,
                JSON.stringify(contentEdited)
            );

            console.log(`Product with ${id} has been removed.`);
        } catch (err) {
            console.log(err);
        }
    };

    deleteAll = async () => {
        try {
            await fs.promises.writeFile(`./resources/${this.fileName}`, "");

            console.log("The file is empty.");
        } catch (err) {
            console.log(err);
        }
    };
}

module.exports = Container;