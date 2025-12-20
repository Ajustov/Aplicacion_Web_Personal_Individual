document.addEventListener("DOMContentLoaded", function() {

    // REFERENCIAS A ELEMENTOS DEL FORMULARIO
    const form = document.getElementById("formContacto");
    const fechaNacimiento = document.getElementById("fecha-nacimiento");
    const edadTexto = document.getElementById("edad");
    const botonInfo = document.getElementById("mostrar-info");
    const infoExtra = document.getElementById("informacion-adicional");

    // MANEJO DEL ENVÍO DEL FORMULARIO
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault(); // Evita que la página se recargue

            // Obtener valores ingresados
            let nombre = document.getElementById("nombre").value.trim();
            let email = document.getElementById("email").value.trim();
            let asunto = document.getElementById("asunto")
                ? document.getElementById("asunto").value.trim()
                : "";
            let mensaje = document.getElementById("mensaje").value.trim();

            // Validación básica de campos obligatorios
            if (!nombre || !email || !mensaje || (document.getElementById("asunto") && !asunto)) {
                alert("Por favor, completa todos los campos antes de enviar.");
                return;
            }

            // Estado visual de envío
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.textContent = "Enviando...";
            submitBtn.classList.add("loading");
            submitBtn.disabled = true;

            // Simulación de envío del formulario
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

    // CÁLCULO AUTOMÁTICO DE LA EDAD
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

    // MOSTRAR U OCULTAR INFORMACIÓN ADICIONAL
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

    // RESALTAR ENLACE ACTIVO DEL MENÚ
    const enlaces = document.querySelectorAll("nav a");
    const paginaActual = window.location.pathname.split("/").pop() || "index.html";
    // MARCAR ENLACE ACTIVO EN EL MENÚ
    enlaces.forEach(a => {
        if (a.getAttribute("href") === paginaActual) {
            a.classList.add("activo"); // Resalta la página actual
        }

        // Transición suave al cambiar de página
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

    // EFECTOS DEL MENÚ Y BOTÓN SUBIR AL HACER SCROLL
    const nav = document.querySelector("nav");
    const btn = document.getElementById("btnSubir");

    window.addEventListener("scroll", () => {

        // Cambia el estilo del menú al desplazarse
        if (nav) {
            if (window.scrollY > 100) {
                nav.classList.add("scrolled");
            } else {
                nav.classList.remove("scrolled");
            }
        }

        // Muestra u oculta el botón para subir
        if (btn) {
            if (window.scrollY > 300) {
                btn.style.display = "flex";
                btn.style.animation = "fadeInUp 0.3s ease-out";
            } else {
                btn.style.display = "none";
            }
        }
    });

    // FUNCIONALIDAD DEL BOTÓN SUBIR
    if (btn) {
        btn.addEventListener("click", () => {
            btn.style.transform = "rotate(360deg)";
            btn.style.transition = "transform 0.5s ease";
            window.scrollTo({ top: 0, behavior: "smooth" });

            setTimeout(() => {
                btn.style.transform = "rotate(0deg)";
            }, 500);
        });
    }

    // ANIMACIÓN DE ELEMENTOS AL APARECER EN PANTALLA
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in, .imagen, section, article');

        elements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');

                // Retraso progresivo para imágenes
                if (element.classList.contains('imagen')) {
                    element.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }

    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll(); // Ejecuta la animación al cargar la página

    // EFECTO HOVER BASADO EN LA POSICIÓN DEL MOUSE
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

    // EFECTO DE APARICIÓN INICIAL DE LA PÁGINA
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
