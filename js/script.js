document.addEventListener('DOMContentLoaded', function() {
    const textItems = document.querySelectorAll('.text-item');
    let currentIndex = 0;

    // Recuperar el índice guardado cuando se carga la página
    const savedIndex = sessionStorage.getItem('currentTextIndex');
    if (savedIndex !== null) {
        currentIndex = parseInt(savedIndex);
        
        // Ocultar todos los textos
        textItems.forEach(item => item.classList.remove('active'));
        
        // Mostrar el texto guardado
        if (textItems[currentIndex]) {
            textItems[currentIndex].classList.add('active');
        }
    }

    // Función para cambiar al siguiente texto
    function nextText() {
        // Ocultar el texto actual
        textItems[currentIndex].classList.remove('active');
        
        // Incrementar el índice y volver a 0 si llega al final
        currentIndex = (currentIndex + 1) % textItems.length;
        
        // Guardar el índice actual en sessionStorage
        sessionStorage.setItem('currentTextIndex', currentIndex);
        
        // Mostrar el siguiente texto
        textItems[currentIndex].classList.add('active');
    }

    // Guardar el índice antes de seguir un enlace
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Guardar el índice actual antes de navegar
            sessionStorage.setItem('currentTextIndex', currentIndex);
        });
    });

    // Agregar evento de clic al body completo
    document.body.addEventListener('click', function(e) {
        // Evitar avanzar el texto si se hizo clic en un enlace
        if (e.target.tagName !== 'A') {
            nextText();
        }
    });
    
    // También funciona con tap en dispositivos móviles
    document.body.addEventListener('touchend', function(e) {
        // Evitar avanzar el texto si se tocó un enlace
        if (e.target.tagName !== 'A') {
            e.preventDefault();
            nextText();
        }
    });
});