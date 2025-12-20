document.addEventListener("DOMContentLoaded", function() {

    // REFERENCIAS: Elementos de la interfaz del juego
    const numeroInput = document.getElementById('numero');
    const adivinarBtn = document.getElementById('adivinar');
    const reiniciarBtn = document.getElementById('reiniciar');
    const mensaje = document.getElementById('mensaje');

    // ESTADO: Variables de control y lógica del número aleatorio
    let numeroSecreto = Math.floor(Math.random() * 100) + 1;
    let intentos = 0;

    // REINICIAR: Restablece el número secreto y limpia la interfaz
    function reiniciarJuego() {
        numeroSecreto = Math.floor(Math.random() * 100) + 1;
        intentos = 0;
        numeroInput.value = '';
        mensaje.textContent = 'Juego reiniciado. ¡Adivina el número!';
    }

    // LÓGICA: Procesamiento del intento del usuario
    adivinarBtn.addEventListener('click', function() {
        const intento = Number(numeroInput.value);
        intentos++;

        // Validación: Asegura que el número esté en el rango correcto
        if (!intento || intento < 1 || intento > 100) {
            mensaje.textContent = 'Por favor, ingresa un número entre 1 y 100.';
            return;
        }

        // Comparación: Verifica si el usuario acertó o necesita pistas
        if (intento === numeroSecreto) {
            mensaje.textContent = `¡Felicidades! Adivinaste el número ${numeroSecreto} en ${intentos} intentos.`;
        } else if (intento < numeroSecreto) {
            mensaje.textContent = 'El número es mayor. Intenta otra vez.';
        } else {
            mensaje.textContent = 'El número es menor. Intenta otra vez.';
        }

        // Limpieza: Prepara el input para el siguiente intento
        numeroInput.value = '';
        numeroInput.focus();
    });

    // EVENTO: Asigna la función de reinicio al botón correspondiente
    reiniciarBtn.addEventListener('click', reiniciarJuego);

    // INICIO: Configuración del mensaje de bienvenida
    mensaje.textContent = 'Estoy pensando en un número entre 1 y 100. ¡Intenta adivinarlo!';
});