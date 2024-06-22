// Función para enviar una reseña
function enviarResena(event) {
  event.preventDefault(); // Evitar envío por defecto del formulario

  var name = document.getElementById("name").value;
  var rating = document.getElementById("rating").value;
  var comment = document.getElementById("comment").value;

  if (name.trim() !== "" && comment.trim() !== "") {
    // Mostrar el modal de confirmación
    mostrarModal();

    // Limpiar los campos del formulario
    limpiarCampos();

    // Agregar la reseña a la lista
    agregarResena(name, rating, comment);
  } else {
    alert("Por favor, completa todos los campos antes de enviar la reseña.");
  }
}

// Función para agregar una reseña a la lista
function agregarResena(name, rating, comment) {
  var reviewsList = document.getElementById("reviewsList");
  var li = document.createElement("li");
  li.innerHTML = `<strong>${name}</strong> - ${rating} estrella(s): ${comment}`;
  reviewsList.appendChild(li);
}

// Función para mostrar el modal de confirmación
function mostrarModal() {
  var modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
  modal.show();
}

// Función para limpiar los campos del formulario
function limpiarCampos() {
  document.getElementById("name").value = "";
  document.getElementById("rating").value = "1";
  document.getElementById("comment").value = "";
}

// Evento para escuchar el envío del formulario
document.getElementById("reviewForm").addEventListener("submit", enviarResena);

// Evento para cerrar el modal
document.getElementById("closeModalButton").addEventListener("click", function() {
  var modal = bootstrap.Modal.getInstance(document.getElementById('confirmationModal'));
  modal.hide();
});