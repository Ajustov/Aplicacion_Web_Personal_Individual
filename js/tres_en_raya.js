document.addEventListener("DOMContentLoaded", function () {

    // REFERENCIAS: Elementos de la interfaz del juego
    const casillas = document.querySelectorAll('.casilla');
    const mensaje = document.getElementById('mensaje');
    const btnReiniciar = document.getElementById('reiniciar');

    // ESTADO: Variables de control de la partida
    let turno = 'X';
    let tablero = Array(9).fill('');
    let juegoTerminado = false;

    // COMBINACIONES GANADORAS
    const combinaciones = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontales
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticales
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    // EVENTO CLIC: Manejo de movimientos
    casillas.forEach(casilla => {
        casilla.addEventListener('click', () => {
            const pos = casilla.dataset.pos;

            // Validación: Casilla libre y juego activo
            if (tablero[pos] !== '' || juegoTerminado) return;

            // Registrar jugada
            tablero[pos] = turno;
            casilla.textContent = turno;
            casilla.classList.add('ocupada'); // marca visualmente la casilla

            // Verificar ganador
            const combinacionGanadora = obtenerCombinacionGanadora(turno);

            if (combinacionGanadora) {
                mensaje.textContent = `¡${turno} ha ganado!`;
                mensaje.classList.add('ganador');
                juegoTerminado = true;

                // Resaltar casillas ganadoras
                combinacionGanadora.forEach(i => {
                    casillas[i].classList.add('ganadora');
                });

            } else if (tablero.every(c => c !== '')) {
                mensaje.textContent = "¡Empate!";
                mensaje.classList.add('empate');
                juegoTerminado = true;

            } else {
                // Cambiar turno
                turno = turno === 'X' ? 'O' : 'X';
                mensaje.textContent = `Turno de ${turno}`;
            }
        });
    });

    // FUNCIÓN: Devuelve la combinación ganadora o null
    function obtenerCombinacionGanadora(jugador) {
        for (let comb of combinaciones) {
            if (comb.every(i => tablero[i] === jugador)) {
                return comb;
            }
        }
        return null;
    }

    // REINICIAR JUEGO
    btnReiniciar.addEventListener('click', () => {
        tablero.fill('');
        turno = 'X';
        juegoTerminado = false;

        casillas.forEach(c => {
            c.textContent = '';
            c.classList.remove('ocupada', 'ganadora');
        });

        mensaje.textContent = `Turno de ${turno}`;
        mensaje.classList.remove('ganador', 'empate');
    });

    // MENSAJE INICIAL
    mensaje.textContent = `Turno de ${turno}`;
});
