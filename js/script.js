// Bloqueo en fase de captura: permite eventos SOLO si vienen del botón #nextButton
(function() {
  document.addEventListener('click', function(e) {
    if (!e.target.closest('#nextButton')) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  document.addEventListener('touchend', function(e) {
    if (!e.target.closest('#nextButton')) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
})();

// Tu lógica para el avance de textos
document.addEventListener('DOMContentLoaded', function() {
    const textItems = document.querySelectorAll('.text-item');
    let currentIndex = 0;

    // Recuperar índice guardado
    const savedIndex = sessionStorage.getItem('currentTextIndex');
    if (savedIndex !== null) {
        currentIndex = parseInt(savedIndex, 10);

        textItems.forEach(item => item.classList.remove('active'));

        if (textItems[currentIndex]) {
            textItems[currentIndex].classList.add('active');
        }
    }
    function nextText() {
        if (textItems.length === 0) return;
        textItems[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % textItems.length;
        sessionStorage.setItem('currentTextIndex', currentIndex);
        textItems[currentIndex].classList.add('active');
    }

    // Guardar índice al seguir enlaces
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            sessionStorage.setItem('currentTextIndex', currentIndex);
        });
    });

    // Botón que avanza (usando tu id/class)
    const nextButton = document.getElementById('nextButton');
    if (nextButton) {
        nextButton.addEventListener('click', function(e) {
            e.stopPropagation(); // por seguridad
            nextText();
        });
    } else {
        console.warn('No se encontró #nextButton en la página.');
    }
});
