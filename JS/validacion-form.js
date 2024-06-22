function validarFormulario() {
  var rut = document.getElementById("rut").value.trim();
  var edad = parseInt(document.getElementById("edad").value.trim(), 10);
  var usuario = document.getElementById("usuario").value.trim();
  var genero = document.getElementById("genero").value;
  var fechaNacimiento = document.getElementById("fecha_nacimiento").value;

  var errores = [];

  // Validación de RUT
  if (rut.length < 9 || rut.length > 10) {
    errores.push("El RUT debe tener entre 9 y 10 caracteres.");
  }

  if (usuario.length < 3 || usuario.length > 20) {
    errores.push("El nombre debe tener entre 3 y 20 caracteres.");
  }

  if (fechaNacimiento === "") {
    errores.push("Debe ingresar su fecha de nacimiento.");
  } else {
    const fechaActual = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edadCalculada = fechaActual.getFullYear() - fechaNac.getFullYear();
    const mes = fechaActual.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNac.getDate())) {
      edadCalculada--;
    }
    if (edadCalculada < 18 || edadCalculada > 35) {
      errores.push(
        "La edad calculada a partir de la fecha de nacimiento debe estar entre 18 y 35 años."
      );
    }
  }

  if (isNaN(edad) || edad < 18 || edad > 35) {
    errores.push("La edad debe estar entre 18 y 35 años.");
  }

  if (genero === "") {
    errores.push("Debe seleccionar un género.");
  }

  if (errores.length > 0) {
    mostrarErrores(errores);
    return false;
  }

  mostrarVentanaEmergente();

  return true;
}

function mostrarVentanaEmergente() {
  // Crear el contenido de la ventana emergente
  var modalContent = `
      <div class="modal fade" id="registroExitosoModal" tabindex="-1" role="dialog" aria-labelledby="registroExitosoModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="registroExitosoModalLabel">¡Formualario exitoso!</h5>
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

function mostrarErrores(errores) {
  var mensaje = "Por favor, corrija los siguientes errores:\n\n";
  errores.forEach(function (error) {
    mensaje += "- " + error + "\n";
  });
  alert(mensaje);
}

function limpiarFormulario() {
  document.getElementById("formulario").reset();
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("enviar").addEventListener("click", function (event) {
    if (validarFormulario()) {
      mostrarNotificacion();
      limpiarFormulario();
      event.preventDefault();
      window.location.href = "index.html";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("volver").addEventListener("click", function (event) {
    window.location.href = "index.html";
  });
});
