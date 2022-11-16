const productos = JSON.parse(localStorage.getItem("productos")) || [];
let monto = productos
  .map((item) => item.precio * item.cantidad)
  .reduce((prev, curr) => prev + curr, 0);

paypal
  .Buttons({
    style: {
      color: "blue", // color azul
      shape: "pill", // borde redondeado
      label: "pay", // Se agrega el "Pagar con ..."
    },
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: monto,
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: monto,
                },
              },
            },
            items: cargarData(),
          },
        ],
      });
    },
    onApprove: function (data, actions) {
      actions.order.capture().then(function (detalles) {
        vaciarCarrito();
        window.location.href = "../index.html";
      });
    },
    onCancel: function (data) {
      alert("Pago cancelado");
    },
  })
  .render("#paypal-button-container");

function cargarData() {
    let arrayObject = [];
    let obj = {};
    productos.forEach( producto => {
        obj = {
            name: producto.nombre,
            unit_amount: {
                currency_code: "USD",
                value: producto.precio,
            },
            quantity: producto.cantidad,
        }
        arrayObject.push(obj);
    })
    return arrayObject;
}

function vaciarCarrito(){
    let carrito = [];
    localStorage.setItem("productos", JSON.stringify(carrito));
}
