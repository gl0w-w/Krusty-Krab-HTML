document.addEventListener("DOMContentLoaded", function () {
  // Obtener todos los elementos con la clase "producto-Agregar"
  var botonesAgregar = document.querySelectorAll(".producto-Agregar");
  // Iterar sobre cada botón y agregar un evento de clic
  botonesAgregar.forEach(function (boton) {
    boton.addEventListener("click", function () {
      // Obtener el elemento h3 dentro del mismo contenedor
      var nombreProducto =
        this.closest(".card").querySelector("h3").textContent;

      // Mostrar el toast.
      var toast = new bootstrap.Toast(document.getElementById("toast"));
      toast.show();
    });
  });
});
