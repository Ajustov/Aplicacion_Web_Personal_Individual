document.addEventListener("DOMContentLoaded", function() {

    // Referencias a elementos del juego
    const casillas = document.querySelectorAll('.casilla');
    const mensaje = document.getElementById('mensaje');

    // Variables de estado del juego
    let turno = 'X';
    let tablero = Array(9).fill('');
    let juegoTerminado = false;

    // Evento de clic en cada casilla
    casillas.forEach(casilla => {
        casilla.addEventListener('click', () => {
            const pos = casilla.dataset.pos;

            // Validar movimiento
            if (tablero[pos] === '' && !juegoTerminado) {
                tablero[pos] = turno;
                casilla.textContent = turno;

                // Verificar si hay ganador
                if (verificarGanador(turno)) {
                    mensaje.textContent = `¡${turno} ha ganado!`;
                    juegoTerminado = true;

                // Verificar empate
                } else if (tablero.every(c => c !== '')) {
                    mensaje.textContent = "¡Empate!";
                    juegoTerminado = true;

                // Cambiar turno
                } else {
                    turno = turno === 'X' ? 'O' : 'X';
                    mensaje.textContent = `Turno de ${turno}`;
                }
            }
        });
    });

    // Comprueba las combinaciones ganadoras
    function verificarGanador(jugador) {
        const combinaciones = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ];

        return combinaciones.some(comb =>
            comb.every(i => tablero[i] === jugador)
        );
    }

    // Reinicia el estado del juego
    document.getElementById('reiniciar').addEventListener('click', () => {
        tablero.fill('');
        casillas.forEach(c => c.textContent = '');
        turno = 'X';
        juegoTerminado = false;
        mensaje.textContent = `Turno de ${turno}`;
    });

    // Mensaje inicial
    mensaje.textContent = `Turno de ${turno}`;
});
