const express = require("express");

const app = express();

app.get("/", (req, res) => {
    const productManager = require("./productManager.js")
    const manager = new productManager() 
    manager.addProduct('Computadora','Es una computadora','350000','./img/computadora.jpg',3554,5)
    manager.addProduct('Caballo','Es un caballo','500','./img/caballo.jpg',1414,1)
    manager.addProduct('Armadura de plata','Es una armadura, de plata.','700','./img/armaduradeplata.jpg',9898,3)
    manager.addProduct('Remolacha shiny','Es una remolacha shiny','95000','./img/remolachashiny.jpg',0909,1)
    manager.addProduct('Jamon 42','Es un 1kg de jamon 42','3000','./img/jamon42.jpg',42,5)
    manager.addProduct('Desodorante Axe','Es un desodorante rexona (el titulo es clickbait)','500','./img/desodoranterexona.jpg',9,15)
    manager.addProduct('Cadena de oro','Es una cadena de oro','25000','./img/cadenadeoro.jpg',040,2)
    manager.addProduct('Arania','Es una araña de javascript, no tiene ñ.','700','./img/arania.jpg',232312,1)
    manager.addProduct('Celular','Es un celular iphone 25','950000','./img/iphone25.jpg',5522,4)
    manager.addProduct('Hamburguesa doble cheddar','Es una hamburguesa doble cheddar','2350','./img/hamburguesadoblecheddar.jpg',98984,10)

    res.send("Productos cargados")
    console.log()
});

app.get("/products", (req,res) => {
    // Escucho la url
    const query = req.query;
    // Traigo todos los productos
    const productos = require("./productos.json")
    // Filtro segun query
    let resultados = productos
    if(query.limit){
        const limit = parseInt(query.limit)
        resultados= resultados.slice(0,limit)
    }
    // Envio resultados
    res.send(resultados)
})

app.get("/products/:id", (req,res) => {
    const id = parseInt(req.params.id)
    // Si el id no es un numero, devolver un error
    if(isNaN(id)){
        res.status(400).send("El id debe ser un numero")
        return
    }
    const productos = require("./productos.json")

    // Busco el resultado especifico por su id
    let resultado = productos.filter(producto => producto.id === id)
    //Devuelvo un error si no hay ningun producto con ese id
    if(resultado.length === 0 ){
        res.status(404).send("No se encontro ningun producto con ese ID")
        return
    }
    res.send(resultado)
    
})
app.listen(8080, () => {
    console.log('Servidor iniciado')
})