document.addEventListener('DOMContentLoaded', function() {
    const textItems = document.querySelectorAll('.text-item');
    const nextButton = document.getElementById('nextButton');
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

    // Evento del botón de navegación
    nextButton.addEventListener('click', function(e) {
        e.stopPropagation(); // Evitar que se dispare el evento del body
        nextText();
    });

    // Agregar evento de clic al body completo (OPCIONAL - puedes quitarlo si solo quieres el botón)
    document.body.addEventListener('click', function(e) {
        // Evitar avanzar si se hizo clic en un enlace o en el botón
        if (e.target.tagName !== 'A' && !e.target.closest('.nav-button')) {
            nextText();
        }
    });
    
    // También funciona con tap en dispositivos móviles
    document.body.addEventListener('touchend', function(e) {
        // Evitar avanzar si se tocó un enlace o el botón
        if (e.target.tagName !== 'A' && !e.target.closest('.nav-button')) {
            e.preventDefault();
            nextText();
        }
    });
});