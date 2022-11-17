function cargarCarrito(){
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    // let monto = productos.map(item => item.precio*item.cantidad).reduce((prev, curr) => prev + curr, 0);
    // total.innerHTML = `
    //     El total a pagar es : <b>S/. ${monto}</b>
    // `
    let html = '';
    if(productos.length == 0){
        contenedor.innerHTML = `
            <h4>El carrito esta vacio</h4>
        `
    } else {
        productos.forEach( producto => {
            html += `
                <div class="col border d-flex flex-row align-items-center justify-content-center my-2" id='${producto.id}'>
                    <img src="${producto.img}" class="img-fluid mx-3" width="120px" alt="">
                    <div class="mx-3">
                        <h4>${producto.nombre}</h4>
                        <p> $ ${producto.precio}</p>
                    </div>
                    <div class="text-center mx-3 d-flex align-items-center">
                        <span class="btn mas">+</span>
                        <span class="fs-4 text-primary mx-3 p-2">${producto.cantidad}</span>
                        <span class="btn menos">-</span>
                    </div>
                    <div>
                        <i class="bi bi-trash-fill btn"></i>
                    </div>
                    
                </div>
            `
        })
        html += `
            <a href="pago.html" class="btn my-2 w-25 d-block mx-auto">Comprar</a>
        `
        contenedor.innerHTML = html;
    }
}

cargarCarrito();

document.getElementById('contenedor').addEventListener('click', async(e) => {
    let carrito = JSON.parse(localStorage.getItem("productos"));
    let id = e.target.parentElement.parentElement.id;
    let index = carrito.findIndex( e => { return e.id == id });
    const respuesta = await fetch("../data/db.json");
    const data = await respuesta.json();
    let total = data[id-1].stock;
    if(e.target.tagName == 'SPAN'){
        if(e.target.classList.contains('mas')){
            total = total - carrito[index].cantidad;
            if(total > 0){
                e.target.nextElementSibling.textContent++;
                carrito[index].cantidad++;
            } else {
                alert('Llego al maximo del stock');
            }
        }

        if(e.target.classList.contains('menos')){
            valor = eval(e.target.previousElementSibling.textContent);
            if(valor > 1){
                e.target.previousElementSibling.textContent--;
                carrito[index].cantidad--;
            }
        }
    }

    if(e.target.tagName == 'I'){
        carrito.splice(index,1);
        e.target.parentElement.parentElement.remove();
    }

    localStorage.setItem("productos", JSON.stringify(carrito));
    actualizarCantidad();
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    if(productos.length == 0){
        contenedor.innerHTML = `
            <h4>El carrito esta vacio</h4>
        `
    } 
})