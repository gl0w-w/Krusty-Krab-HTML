window.addEventListener("load", function () {
  var agregarBtns = document.querySelectorAll(".producto-Agregar");
  var numerito = document.getElementById("numerito");
  var cantidadEnCarrito =
    parseInt(localStorage.getItem("cantidadEnCarrito")) || 0;
  numerito.textContent = cantidadEnCarrito;

  function agregarAlCarrito() {
    cantidadEnCarrito++;
    numerito.textContent = cantidadEnCarrito;
    localStorage.setItem("cantidadEnCarrito", cantidadEnCarrito);

    var producto = this.closest(".card");

    var productosEnCarrito =
      JSON.parse(localStorage.getItem("productosEnCarrito")) || [];
    productosEnCarrito.push(producto.outerHTML);
    localStorage.setItem(
      "productosEnCarrito",
      JSON.stringify(productosEnCarrito)
    );

    agregarAlCarritoVisual(producto);

    mostrarTotalCompra();
  }

  agregarBtns.forEach(function (btn) {
    btn.addEventListener("click", agregarAlCarrito);
  });

  var botonComprar = document.querySelector(".boton-comprar");

  botonComprar.addEventListener("click", function () {
    var productosEnCarrito =
      JSON.parse(localStorage.getItem("productosEnCarrito")) || [];
    if (productosEnCarrito.length === 0) {
      alert("Por favor, agregue algún producto al carrito antes de comprar.");
      // Redirecciona al usuario a index.html si no hay productos en el carrito
      window.location.href = "index.html";
      return;
    }
    alert("¡Muchas gracias por su compra!");
    document.getElementById("productos-en-carrito-container").innerHTML = "";
    numerito.textContent = "0";
    localStorage.removeItem("productosEnCarrito");
    localStorage.setItem("cantidadEnCarrito", "0");
    window.location.href = "index.html";

    // Mostrar la ventana emergente de compra exitosa
    mostrarVentanaEmergente();

    window.location.href = "index.html"; // Esto también asegura la redirección después de la compra
  });

  function mostrarTotalCompra() {
    var total = 0;
    var productosEnCarrito =
      JSON.parse(localStorage.getItem("productosEnCarrito")) || [];

    productosEnCarrito.forEach(function (productoHTML) {
      var precio = parseFloat(
        productoHTML.match(/Precio: \$([0-9,.]+)/)[1].replace(",", "")
      );
      total += precio;
    });

    document.querySelector(".Total-compra-txt").textContent =
      "Total de compras: $" + total.toFixed(2);
  }

  if (window.location.pathname === "/compra.html") {
    var cards = document.querySelectorAll(".card");
    cards.forEach(function (card) {
      var precio = card.querySelector("p");
      var botonAgregar = card.querySelector(".producto-Agregar");
      if (precio && botonAgregar) {
        precio.style.display = "none";
        botonAgregar.style.display = "none";

        card.querySelector("h3").style.display = "block";
        card.querySelector("p").style.display = "block";
      }
    });
  }
});

function agregarAlCarritoVisual(producto) {
  if (window.location.pathname !== "/carrito.html") {
    var nuevoProducto = document.createElement("div");
    nuevoProducto.classList.add("card", "producto-en-carrito");
    nuevoProducto.innerHTML = `
        <img class="card-img" src="${
          producto.querySelector("img").src
        }" alt="Producto">
        <div class="card-content">
            <h3 class="card-content-title">${
              producto.querySelector("h3").textContent
            }</h3>
            <p class="card-content-description">Descripción del producto</p>
    `;
    var productosEnCarritoContainer = document.getElementById(
      "productos-en-carrito-container"
    );
    productosEnCarritoContainer.appendChild(nuevoProducto);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var productosEnCarritoContainer = document.getElementById(
    "productos-en-carrito-container"
  );
  var numerito = document.getElementById("numerito");
  var vaciarBtn = document.querySelector(".boton-vaciar-carrito");

  function vaciarCarrito() {
    if (productosEnCarritoContainer.children.length === 0) {
      alert("Por favor, realice una compra.");
      window.location.href = "index.html";
      return;
    }

    productosEnCarritoContainer.innerHTML = "";
    var cantidadEnCarrito = 0;
    numerito.textContent = cantidadEnCarrito;
    localStorage.removeItem("productosEnCarrito");
    localStorage.setItem("cantidadEnCarrito", cantidadEnCarrito);

    // Restablece el total de la compra al vaciar el carrito
    document.querySelector(".Total-compra-txt").textContent =
      "Total de compras: $0.00";
  }

  vaciarBtn.addEventListener("click", vaciarCarrito);

  var productosEnCarrito =
    JSON.parse(localStorage.getItem("productosEnCarrito")) || [];
  var cantidadEnCarrito = productosEnCarrito.length;
  numerito.textContent = cantidadEnCarrito;

  productosEnCarrito.forEach(function (productoHTML) {
    var nuevoProducto = document.createElement("div");
    nuevoProducto.innerHTML = productoHTML;
    productosEnCarritoContainer.appendChild(nuevoProducto);
  });

  mostrarTotalCompra();
});

function mostrarTotalCompra() {
  var total = 0;
  var productosEnCarrito =
    JSON.parse(localStorage.getItem("productosEnCarrito")) || [];

  // Itera sobre cada producto en el carrito y suma sus precios
  productosEnCarrito.forEach(function (productoHTML) {
    // Extrae el precio del HTML del producto
    var precioMatch = productoHTML.match(/Precio: \$([0-9,.]+)/);
    if (precioMatch) {
      var precio = parseFloat(precioMatch[1].replace(",", ""));
      total += precio;
    }
  });

  // Muestra el total en el elemento HTML
  document.querySelector(".Total-compra-txt").textContent =
    "Total de compras: $" + total.toFixed(2);
}

function mostrarVentanaEmergente() {
  // Crear el contenido de la ventana emergente
  var modalContent = `
      <div class="modal fade" id="registroExitosoModal" tabindex="-1" role="dialog" aria-labelledby="registroExitosoModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="registroExitosoModalLabel">¡Formulario exitoso!</h5>
                      </button>
                  </div>
                  <div class="modal-body">
                      El formulario se ha completado exitosamente. 😃
                  </div>
                  <div class="modal-footer">
                      <a href="index.html" class="btn btn-primary">Ir al inicio</a>
                  </div>
              </div>
          </div>
      </div>
  `;

  // Agregar el contenido a la página
  document.body.insertAdjacentHTML("beforeend", modalContent);

  // Mostrar la ventana emergente
  $("#registroExitosoModal").modal("show");

  // Eliminar la ventana emergente del DOM después de cerrarla
  $("#registroExitosoModal").on("hidden.bs.modal", function (e) {
    $(this).remove();
  });
}
