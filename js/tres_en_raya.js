const casillas = document.querySelectorAll('.casilla');
let turno = 'X';
let tablero = Array(9).fill('');

casillas.forEach(casilla => {
    casilla.addEventListener('click', () => {
        const pos = casilla.dataset.pos;
        if (tablero[pos] === '') {
            tablero[pos] = turno;
            casilla.textContent = turno;
            if (verificarGanador(turno)) {
                alert(turno + ' ha ganado!');
            } else {
                turno = turno === 'X' ? 'O' : 'X';
            }
        }
    });
});

function verificarGanador(jugador) {
    const combinaciones = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    return combinaciones.some(comb => comb.every(i => tablero[i] === jugador));
}

document.getElementById('reiniciar').addEventListener('click', () => {
    tablero.fill('');
    casillas.forEach(c => c.textContent = '');
    turno = 'X';
});
