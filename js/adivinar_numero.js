document.addEventListener("DOMContentLoaded", function() {

    // Referencias a elementos del juego
    const numeroInput = document.getElementById('numero');
    const adivinarBtn = document.getElementById('adivinar');
    const reiniciarBtn = document.getElementById('reiniciar');
    const mensaje = document.getElementById('mensaje');

    // Variables del juego
    let numeroSecreto = Math.floor(Math.random() * 100) + 1;
    let intentos = 0;

    // Reinicia el estado del juego
    function reiniciarJuego() {
        numeroSecreto = Math.floor(Math.random() * 100) + 1;
        intentos = 0;
        numeroInput.value = '';
        mensaje.textContent = 'Juego reiniciado. ¡Adivina el número!';
    }

    // Evento para adivinar el número
    adivinarBtn.addEventListener('click', function() {
        const intento = Number(numeroInput.value);
        intentos++;

        // Validación del número ingresado
        if (!intento || intento < 1 || intento > 100) {
            mensaje.textContent = 'Por favor, ingresa un número entre 1 y 100.';
            return;
        }

        // Comparación con el número secreto
        if (intento === numeroSecreto) {
            mensaje.textContent = `¡Felicidades! Adivinaste el número ${numeroSecreto} en ${intentos} intentos.`;
        } else if (intento < numeroSecreto) {
            mensaje.textContent = 'El número es mayor. Intenta otra vez.';
        } else {
            mensaje.textContent = 'El número es menor. Intenta otra vez.';
        }

        numeroInput.value = '';
        numeroInput.focus();
    });

    // Botón para reiniciar el juego
    reiniciarBtn.addEventListener('click', reiniciarJuego);

    // Mensaje inicial
    mensaje.textContent = 'Estoy pensando en un número entre 1 y 100. ¡Intenta adivinarlo!';
});
