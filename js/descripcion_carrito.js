function actualizarCantidad(){
    let carrito = JSON.parse(localStorage.getItem("productos")) || [];
    let productosCantidad = 0;
    carrito.forEach( e => {
        productosCantidad += e.cantidad;
    })
    valor_carrito.textContent = productosCantidad;
}

actualizarCantidad();

document.getElementById('contenedor').addEventListener('click',async (e) => {
    let carrito = JSON.parse(localStorage.getItem("productos")) ||  [];
    let id = contenedor.firstElementChild.id;
    const respuesta = await fetch("../data/db.json");
    const data = await respuesta.json();
    let valor = 0;
    let index = carrito.findIndex( e => { return e.id == id });
    if(e.target.id == 'buttonSum'){
        e.target.nextElementSibling.textContent++;
    }

    if(e.target.id == 'buttonRes'){
        valor = eval(e.target.previousElementSibling.textContent);
        if(valor > 1){
            e.target.previousElementSibling.textContent--;
        }
    }

    if(e.target.id == 'agregarCarro'){
        if(carrito.length  == 0 || index == -1){
            producto = {
                "id" : data[id-1].id,
                "nombre" : data[id-1].nombre,
                "img" : data[id-1].img_principal,
                "precio" : data[id-1].precio,
                "cantidad" : parseInt(counting.textContent)
            }
            carrito.push(producto);
        } else if(index != -1) {
            carrito[index].cantidad += parseInt(counting.textContent);
        }
        localStorage.setItem("productos", JSON.stringify(carrito));
        actualizarCantidad();
    }
});