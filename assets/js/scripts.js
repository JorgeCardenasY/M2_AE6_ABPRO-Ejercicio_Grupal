$(document).ready(function () {
  // Manejar clic en todos los botones de reserva
  $("[id^='Reservar']").click(function () {
    // Obtener el título de la película desde el botón clickeado
    const movieTitle = $(this)
      .closest(".card-body")
      .find(".card-title")
      .text()
      .trim();

    // Establecer la película en el select
    $("#peliculaSelect").val(movieTitle);

    // Mostrar el modal
    $("#miModal").modal("show");
  });

  // Validar y enviar formulario
  $("#guardarCambios").click(function () {
    const form = document.getElementById("formReserva");

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Recopilar datos del formulario
    const formData = {
      pelicula: $("#peliculaSelect").val(),
      horario: $("#horarioSelect").val(),
      asientos: $("#cantidadAsientos").val(),
      titular: $("#cc_name").val(),
      tarjeta: $("#tarjeta").val(),
      cvv: $("#cvv").val(),
    };

    // Aquí iría la lógica para procesar la reserva
    alert("¡Reserva confirmada para " + formData.pelicula + "!");
    $("#miModal").modal("hide");
  });

  // Eventos del modal
  $("#miModal").on("shown.bs.modal", function () {
    console.log("El modal se ha mostrado completamente");
  });

  $("#miModal").on("hidden.bs.modal", function () {
    console.log("El modal se ha cerrado");
    document.getElementById("formReserva").reset();
  });
});

// Formatear número de tarjeta (agregar espacios cada 4 dígitos)
$("#tarjeta").on("input", function () {
  let value = $(this).val().replace(/\s/g, "").replace(/\D/g, "");
  if (value.length > 16) value = value.substring(0, 16);
  let formatted = value.replace(/(\d{4})/g, "$1 ").trim();
  $(this).val(formatted);
});

// Formatear fecha de vencimiento (MM/AA)
$("#fechaVencimiento").on("input", function () {
  let value = $(this).val().replace(/\D/g, "");
  if (value.length > 4) value = value.substring(0, 4);
  if (value.length > 2) {
    value = value.substring(0, 2) + "/" + value.substring(2);
  }
  $(this).val(value);
});

// Validar que CVV solo tenga números
$("#cvv").on("input", function () {
  $(this).val($(this).val().replace(/\D/g, "").substring(0, 3));
});
