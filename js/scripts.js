// Esperar a que se cargue todo el contenido del documento
window.onload = function() {

    //Obtener los elementos por su id
    var formulario = document.getElementById("form-contacto");
    var fechaNacimiento = document.getElementById("fecha-nacimiento");
    var edadTexto = document.getElementById("edad");
    var botonInfo = document.getElementById("mostrar-info");
    var infoExtra = document.getElementById("informacion-adicional");

    //Cuando el usuario envía el formulario
    formulario.onsubmit = function(event) {
        event.preventDefault(); // Evita que se recargue la página

        //Guardar los valores escritos por el usuario
        var nombre = document.getElementById("nombre").value;
        var correo = document.getElementById("correo").value;
        var asunto = document.getElementById("asunto").value;
        var mensaje = document.getElementById("mensaje").value;

        //Validar que no haya campos vacíos
        if (nombre === "" || correo === "" || asunto === "" || mensaje === "") {
            alert("Por favor, completa todos los campos antes de enviar.");
        } else {
            alert("¡Mensaje enviado correctamente!");
            formulario.reset(); //Limpia los campos
            edadTexto.textContent = ""; //Borra el texto de edad
        }
    };

    //Calcular edad automáticamente cuando se elige la fecha
    fechaNacimiento.onchange = function() {
        var fecha = new Date(fechaNacimiento.value);
        var hoy = new Date();

        //Verificar que la fecha sea válida
        if (!isNaN(fecha)) {
            var edad = hoy.getFullYear() - fecha.getFullYear();
            var mes = hoy.getMonth() - fecha.getMonth();

            if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
                edad--;
            }

            edadTexto.textContent = "Edad: " + edad + " años";
        } else {
            edadTexto.textContent = "";
        }
    };

    //Mostrar u ocultar información adicional
    botonInfo.onclick = function() {
        if (infoExtra.style.display === "none") {
            infoExtra.style.display = "block";
            botonInfo.textContent = "Ocultar información adicional";
        } else {
            infoExtra.style.display = "none";
            botonInfo.textContent = "Mostrar información adicional";
        }
    };
};
