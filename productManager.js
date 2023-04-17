const fs = require('fs')

class productManager {
    constructor(){
        this.products = []
        this.index = 0
        this.path = "./productos.json"
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t") )
    }

    getProducts = () => {
        const productsList = fs.readFileSync(this.path, "utf-8")
        return (productsList)
    }

    getProductById = (id) => {
        return this.products.find((products) => products.id === id)
    }
    
    addProduct = (title,description,price,thumbnail,code,stock) => {
        this.index++
        const id = this.index
        const product = { id, title, description, price, thumbnail, code, stock}
        //que todas las propiedades sean obligatorias
        if(!title || !description || !price || !thumbnail || !code || !stock){
            return console.log("Error, faltan datos")
        }
        // validar que no se repita el codigo
        const index = this.products.findIndex((p) => p.code === code);
        if (index !== -1) {
        return console.log("Error, hay un codigo similar");
        }

            this.products.push(product)
            fs.writeFileSync(this.path, JSON.stringify(this.products,null,"\t"))
        }
    updateProduct(id, title, description, price, image, code, stock) {
        const product = this.products.find((product) => product.id === id)
        if (!product) {
            return console.log('Error: El producto no existe')
        }
    
        const newProduct = {id, title, description, price, image, code, stock}
        this.products = this.products.map((product) => product.id === id ? newProduct : product)
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, '\t'))
        }

    deleteProduct = (id) =>{
        const lista = JSON.parse(fs.readFileSync(this.path, "utf-8")) ;
        const borrar = lista.findIndex(obj=>obj.id === id)
        lista.splice(borrar, 1);
        const updateList =JSON.stringify(lista);
        fs.writeFileSync(this.path, updateList)
        }
    }


module.exports = productManager;
/* manager.addProduct('Computadora','Es una computadora','350000','./img/computadora.jpg',3554,5) */
/* manager.addProduct('Caballo','Es un caballo','5','./img/caballo.jpg',1414,1) */
/* manager.addProduct('Rinoceronte','Es un rinoceronte','200000','./img/rinoceronte.jpg',1414,99)
manager.addProduct('Generaerrores','Es un generaerrores','000','./img/errores.jpg',1414,99) */
/* console.log("Primer get products y buscar un producto segun el ID")
console.log(manager.getProducts())
console.log('Este es el producto que buscaste segun el ID:', manager.getProductById(2)) */

// actualizo producto computadora
/* console.log("Actualizo producto computadora")
manager.updateProduct(1,"Computadora","xd","xd","xd","xd","xd")
console.log(manager.getProducts()) */
// borro producto computadora y agrego rinoceronte
/* console.log("Borro computadora y agrego rinoceronte")
manager.addProduct('Rinoceronte','Es un rinoceronte','200000','./img/rinoceronte.jpg',9898,99)
manager.deleteProduct(1)
console.log(manager.getProducts()) */