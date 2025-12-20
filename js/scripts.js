document.addEventListener("DOMContentLoaded", function() {

    // FORMULARIO DE CONTACTO
    const form = document.getElementById("formContacto");
    
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault(); // Evita el envío automático
            
            // Añadir efecto de carga
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.textContent = "Enviando...";
            submitBtn.classList.add("loading");
            submitBtn.disabled = true;
            
            let nombre = document.getElementById("nombre").value.trim();
            let email = document.getElementById("email").value.trim();
            let mensaje = document.getElementById("mensaje").value.trim();
        });
    }

    // NAV ACTIVO
    const enlaces = document.querySelectorAll("nav a");
    const paginaActual = window.location.pathname.split("/").pop() || "index.html";
    
    enlaces.forEach(a => {
        if (a.getAttribute("href") === paginaActual) {
            a.classList.add("activo");
        }

        // Añadir efecto de transición suave entre páginas
        a.addEventListener("click", function() {
            if (!this.classList.contains("activo")) {
                document.body.style.opacity = "0.8";
                document.body.style.transition = "opacity 0.3s ease";
                
                setTimeout(() => {
                    document.body.style.opacity = "1";
                }, 300);
            }
        });
    });

    // MENÚ Y BOTÓN SUBIR (ANIMACIÓN SCROLL)
    const nav = document.querySelector("nav");
    const btn = document.getElementById("btnSubir");

    window.addEventListener("scroll", () => {
        // Efecto en el menú al hacer scroll
        if (nav) {
            if (window.scrollY > 100) {
                nav.classList.add("scrolled");
            } else {
                nav.classList.remove("scrolled");
            }
        }

        // Mostrar u ocultar botón de subir
        if (btn) {
            if (window.scrollY > 300) {
                btn.style.display = "flex";
                btn.style.animation = "fadeInUp 0.3s ease-out";
            } else {
                btn.style.display = "none";
            }
        }
    });

    // LÓGICA BOTÓN SUBIR
    if (btn) {
        btn.addEventListener("click", () => {
            // Añadir efecto de rotación
            btn.style.transform = "rotate(360deg)";
            btn.style.transition = "transform 0.5s ease";
            
            // Scroll suave hacia arriba
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            
            // Restaurar rotación
            setTimeout(() => {
                btn.style.transform = "rotate(0deg)";
            }, 500);
        });
    }

    // ANIMACIÓN DE ELEMENTOS AL HACER SCROLL
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in, .imagen, section, article');
        
        elements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');

                // Añadir delay escalonado para elementos múltiples (imágenes)
                if (element.classList.contains('imagen')) {
                    element.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }

    // EVENTO DE SCROLL PARA ANIMACIONES
    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll(); // Ejecución inicial

    // EFECTO HOVER EN TARJETAS (COORDENADAS DEL MOUSE)
    const cards = document.querySelectorAll('.imagen, article');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // CARGA INICIAL DE LA PÁGINA
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
