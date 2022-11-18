function cargarCarrito() {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  // let monto = productos.map(item => item.precio*item.cantidad).reduce((prev, curr) => prev + curr, 0);
  // total.innerHTML = `
  //     El total a pagar es : <b>S/. ${monto}</b>
  // `
  let html = "";
  if (productos.length == 0) {
    contenedor.innerHTML = `
            <div class="container">
      <div class="shop-box row">
        <div class="col-sm ">
          <h3 >¡TU CARRITO ESTÁ VACÍO AHORA MISMO!</h3>
          <p  style="text-align: justify;" >
            ¿Aún no te has decidido?. Tenemos productos que te encantarán revisa el menú de arriba.
            Si no sabes dónde empezar te recomiendo <i>la lista de los más vendidos</i>
          </p>

          <button class="btn btn-warning mt-4"><a style="color:black" href="./catalogo.html?categoria=AUDIFONOS">Volver a la tienda</a></button>
        </div>
        <div class="col-sm ">
          <img
            src="../images//empty_card.png"
            alt="Icon"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
        `;
  } else {
    productos.forEach((producto) => {
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
            `;
    });
    html += `
            <a href="pago.html" class="btn my-2 w-25 d-block mx-auto">Comprar</a>
        `;
    contenedor.innerHTML = html;
  }
}

cargarCarrito();

document.getElementById("contenedor").addEventListener("click", (e) => {
  let carrito = JSON.parse(localStorage.getItem("productos"));
  let id = e.target.parentElement.parentElement.id;
  let index = carrito.findIndex((e) => {
    return e.id == id;
  });
  if (e.target.tagName == "SPAN") {
    if (e.target.classList.contains("mas")) {
      e.target.nextElementSibling.textContent++;
      carrito[index].cantidad++;
    }

    if (e.target.classList.contains("menos")) {
      e.target.previousElementSibling.textContent--;
      carrito[index].cantidad--;
    }
  }

  if (e.target.tagName == "I") {
    carrito.splice(index, 1);
    e.target.parentElement.parentElement.remove();
  }

  localStorage.setItem("productos", JSON.stringify(carrito));
  actualizarCantidad();
  // let monto = carrito.map(item => item.precio*item.cantidad).reduce((prev, curr) => prev + curr, 0);
  // total.innerHTML = `
  //     El total a pagar es : <b>S/.${monto}</b>
  // `
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  if (productos.length == 0) {
    contenedor.innerHTML = `
            <div class="container">
      <div class="shop-box row">
        <div class="col-sm ">
          <h3 >¡TU CARRITO ESTÁ VACÍO AHORA MISMO!</h3>
          <p  style="text-align: justify;" >
            ¿Aún no te has decidido?. Tenemos productos que te encantarán revisa el menú de arriba.
            Si no sabes dónde empezar te recomiendo <i>la lista de los más vendidos</i>
          </p>

          <button class="btn btn-warning mt-4"><a style="color:black" href="./catalogo.html?categoria=AUDIFONOS">Volver a la tienda</a></button>
        </div>
        <div class="col-sm ">
          <img
            src="../images//empty_card.png"
            alt="Icon"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
        `;
  }
});
