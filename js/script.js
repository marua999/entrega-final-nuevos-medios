document.addEventListener('DOMContentLoaded', function() {
    const textItems = document.querySelectorAll('.text-item');
    let currentIndex = 0;

    // Recuperar índice guardado
    const savedIndex = sessionStorage.getItem('currentTextIndex');
    if (savedIndex !== null) {
        currentIndex = parseInt(savedIndex);

        textItems.forEach(item => item.classList.remove('active'));

        if (textItems[currentIndex]) {
            textItems[currentIndex].classList.add('active');
        }
    }

    // Función para avanzar el texto
    function nextText() {
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

    // ✔ Botón para avanzar
    const nextButton = document.getElementById('nextButton');
    nextButton.addEventListener('click', function(e) {
        e.stopPropagation();   // Previene interferencias
        nextText();            // Avanza correctamente
    });
});
