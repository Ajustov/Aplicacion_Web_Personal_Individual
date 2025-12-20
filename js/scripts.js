document.addEventListener("DOMContentLoaded", function() {

    // REFERENCIAS: Elementos principales del DOM
    const form = document.getElementById("formContacto");
    const fechaNacimiento = document.getElementById("fecha-nacimiento");
    const edadTexto = document.getElementById("edad");
    const botonInfo = document.getElementById("mostrar-info");
    const infoExtra = document.getElementById("informacion-adicional");

    // FORMULARIO: Validación y simulación de envío
    if (form) {
        form.addEventListener("submit", function(e) {
            //e.preventDefault(); // Evita recarga de página

            // Obtención y limpieza de valores
            let nombre = document.getElementById("nombre").value.trim();
            let email = document.getElementById("email").value.trim();
            let asunto = document.getElementById("asunto") ? document.getElementById("asunto").value.trim() : "";
            let mensaje = document.getElementById("mensaje").value.trim();

            // Validación de campos obligatorios
            if (!nombre || !email || !mensaje || (document.getElementById("asunto") && !asunto)) {
                alert("Por favor, completa todos los campos antes de enviar.");
                return;
            }

            // Estado visual: Botón en modo carga
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.textContent = "Enviando...";
            submitBtn.classList.add("loading");
            submitBtn.disabled = true;

            // Simulación de proceso de envío
            setTimeout(() => {
                alert("¡Mensaje enviado correctamente!");
                form.reset();
                if (edadTexto) edadTexto.textContent = "";
                submitBtn.textContent = "Enviar";
                submitBtn.classList.remove("loading");
                submitBtn.disabled = false;
            }, 1000);
        });
    }

    // EDAD: Cálculo automático basado en fecha de nacimiento
    if (fechaNacimiento && edadTexto) {
        fechaNacimiento.addEventListener("change", function() {
            const fecha = new Date(fechaNacimiento.value);
            const hoy = new Date();

            if (!isNaN(fecha)) {
                let edad = hoy.getFullYear() - fecha.getFullYear();
                const mes = hoy.getMonth() - fecha.getMonth();

                if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
                    edad--;
                }
                edadTexto.textContent = "Edad: " + edad + " años";
            } else {
                edadTexto.textContent = "";
            }
        });
    }

    // INFO EXTRA: Alternar visibilidad de datos adicionales
    if (botonInfo && infoExtra) {
        botonInfo.addEventListener("click", () => {
            if (infoExtra.style.display === "none" || infoExtra.style.display === "") {
                infoExtra.style.display = "block";
                botonInfo.textContent = "Ocultar información adicional";
            } else {
                infoExtra.style.display = "none";
                botonInfo.textContent = "Mostrar información adicional";
            }
        });
    }

    // NAVEGACIÓN: Enlace activo y transiciones de página
    const enlaces = document.querySelectorAll("nav a");
    const paginaActual = window.location.pathname.split("/").pop() || "index.html";

    enlaces.forEach(a => {
        if (a.getAttribute("href") === paginaActual) {
            a.classList.add("activo");
        }

        a.addEventListener("click", function() {
            if (!this.classList.contains("activo")) {
                document.body.style.opacity = "0.8";
                document.body.style.transition = "opacity 0.3s ease";
                setTimeout(() => document.body.style.opacity = "1", 300);
            }
        });
    });

    // SCROLL: Comportamiento del menú y botón de subir
    const nav = document.querySelector("nav");
    const btn = document.getElementById("btnSubir");

    window.addEventListener("scroll", () => {
        if (nav) {
            if (window.scrollY > 100) {
                nav.classList.add("scrolled");
            } else {
                nav.classList.remove("scrolled");
            }
        }

        if (btn) {
            if (window.scrollY > 300) {
                btn.style.display = "flex";
                btn.style.animation = "fadeInUp 0.3s ease-out";
            } else {
                btn.style.display = "none";
            }
        }
    });

    // BTN SUBIR: Animación de rotación y scroll suave
    if (btn) {
        btn.addEventListener("click", () => {
            btn.style.transform = "rotate(360deg)";
            btn.style.transition = "transform 0.5s ease";
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => btn.style.transform = "rotate(0deg)", 500);
        });
    }

    // ANIMACIONES: Activación de elementos al hacer scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in, .imagen, section, article');

        elements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 150) {
                element.classList.add('visible');
                if (element.classList.contains('imagen')) {
                    element.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }

    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll();

    // MOUSE TRACKING: Coordenadas para efectos visuales
    const cards = document.querySelectorAll('.imagen, article');
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });

    // PÁGINA: Efecto de fundido inicial
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    setTimeout(() => document.body.style.opacity = '1', 100);
});