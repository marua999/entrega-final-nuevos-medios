// ====================================================================
// BLOQUEO GLOBAL DE CLICKS:
// Permite eventos SOLO desde el botón #nextButton o desde enlaces <a>
// ====================================================================

(function() {
    document.addEventListener('click', function(e) {
        const isButton = e.target.closest('#nextButton');
        const isLink = e.target.closest('a');

        // Si NO es botón ni enlace, bloqueamos el click
        if (!isButton && !isLink) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);

    document.addEventListener('touchend', function(e) {
        const isButton = e.target.closest('#nextButton');
        const isLink = e.target.closest('a');

        // Igual para mobiles
        if (!isButton && !isLink) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);
})();


// ====================================================================
// MANEJO DEL TEXTO: AVANZAR CON EL BOTÓN
// Mantiene sessionStorage, inicia en el último párrafo leído, etc.
// ====================================================================

document.addEventListener('DOMContentLoaded', function() {

    const textItems = document.querySelectorAll('.text-item');
    let currentIndex = 0;

    // ---------------------------------------------------------------
    // Recuperar índice almacenado (para volver donde quedó el lector)
    // ---------------------------------------------------------------
    const savedIndex = sessionStorage.getItem('currentTextIndex');
    if (savedIndex !== null) {
        currentIndex = parseInt(savedIndex, 10);

        // Ocultar todos
        textItems.forEach(item => item.classList.remove('active'));

        // Mostrar solo el guardado
        if (textItems[currentIndex]) {
            textItems[currentIndex].classList.add('active');
        }
    }

    // ---------------------------------------------------------------
    // Función para avanzar texto
    // ---------------------------------------------------------------
    function nextText() {
        if (textItems.length === 0) return;

        // Ocultar texto actual
        textItems[currentIndex].classList.remove('active');

        // Siguiente (si llega al final, vuelve al inicio)
        currentIndex = (currentIndex + 1) % textItems.length;

        // Guardar progreso
        sessionStorage.setItem('currentTextIndex', currentIndex);

        // Mostrar siguiente
        textItems[currentIndex].classList.add('active');
    }

    // ---------------------------------------------------------------
    // Guardar índice si se hace click en un enlace
    // ---------------------------------------------------------------
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            sessionStorage.setItem('currentTextIndex', currentIndex);
        });
    });

    // ---------------------------------------------------------------
    // Configurar el botón para avanzar
    // ---------------------------------------------------------------
    const nextButton = document.getElementById('nextButton');
    if (nextButton) {
        nextButton.addEventListener('click', function(e) {
            e.stopPropagation();
            nextText();
        });
    } else {
        console.warn("⚠ No se encontró el botón #nextButton en el HTML.");
    }
});

