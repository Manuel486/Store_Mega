function actualizarCantidad(){
    let carrito = JSON.parse(localStorage.getItem("productos")) || [];
    let productosCantidad = 0;
    carrito.forEach( e => {
        productosCantidad += e.cantidad;
    })
    valor_carrito.textContent = productosCantidad;
}

actualizarCantidad();

contenedor.addEventListener('click',async(event) => {
    if(event.srcElement.nodeName == 'BUTTON'){
        const id = event.srcElement.parentNode.parentNode.parentNode.parentNode.id;
        let productosCantidad = 1;
        let carrito = JSON.parse(localStorage.getItem("productos")) || [];
        const respuesta = await fetch("../data/db.json");
        const data = await respuesta.json();
        let  index = -1 ;
        let producto = {}
        if(carrito.length == 0){
            producto = {
                "id" : data[id-1].id,
                "nombre" : data[id-1].nombre,
                "img" : data[id-1].img_principal,
                "precio" : data[id-1].precio,
                "cantidad" : productosCantidad
            }
            carrito.push(producto);
        } else {
            carrito.forEach( e => {
                productosCantidad += e.cantidad;
            })
            index = carrito.findIndex( e => { return e.id == id });
            if( index == -1 ){
                producto = {
                    "id" : data[id-1].id,
                    "nombre" : data[id-1].nombre,
                    "img" : data[id-1].img_principal,
                    "precio" : data[id-1].precio,
                    "cantidad" : 1
                }
                carrito.push(producto);
            } else {
                carrito[index].cantidad++;
            }
        }
        valor_carrito.textContent = productosCantidad;
        localStorage.setItem("productos", JSON.stringify(carrito));
    }
})