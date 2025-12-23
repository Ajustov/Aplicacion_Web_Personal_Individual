document.addEventListener("DOMContentLoaded", function() {

    // REFERENCIAS: Elementos principales del DOM
    const form = document.getElementById("formContacto");
    const fechaNacimiento = document.getElementById("fecha-nacimiento");
    const edadTexto = document.getElementById("edad");
    const botonInfo = document.getElementById("mostrar-info");
    const infoExtra = document.getElementById("informacion-adicional");

    // FUNCIÓN: Mostrar error visual en un input
    function mostrarError(input, mensaje) {
        input.classList.add("error");

        let error = input.nextElementSibling;
        if (!error || !error.classList.contains("error-text")) {
            error = document.createElement("small");
            error.className = "error-text";
            input.after(error);
        }
        error.textContent = mensaje;
    }

    // FUNCIÓN: Limpiar error visual de un input
    function limpiarError(input) {
        input.classList.remove("error");
        let error = input.nextElementSibling;
        if (error && error.classList.contains("error-text")) {
            error.remove();
        }
    }

    // FORMULARIO: Validación general y simulación de envío
    if (form) {
        form.addEventListener("submit", function(e) {
            // e.preventDefault(); // Evita envío automático si hay errores

            // REFERENCIAS A INPUTS
            const nombreInput = document.getElementById("nombre");
            const emailInput = document.getElementById("email");
            const asuntoInput = document.getElementById("asunto");
            const mensajeInput = document.getElementById("mensaje");

            // LIMPIAR ERRORES PREVIOS
            [nombreInput, emailInput, asuntoInput, mensajeInput].forEach(input => {
                if (input) limpiarError(input);
            });

            // OBTENCIÓN DE VALORES
            let nombre = nombreInput.value.trim();
            let email = emailInput.value.trim();
            let asunto = asuntoInput ? asuntoInput.value.trim() : "";
            let mensaje = mensajeInput.value.trim();

            // EXPRESIONES REGULARES BÁSICAS
            const nombreRegex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]{2,}$/;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            let hayErrores = false;

            // VALIDACIÓN: Nombre
            if (!nombreRegex.test(nombre)) {
                mostrarError(nombreInput, "El nombre solo debe contener letras (mínimo 2 caracteres).");
                hayErrores = true;
            }

            // VALIDACIÓN: Email
            if (!emailRegex.test(email)) {
                mostrarError(emailInput, "Ingresa un correo electrónico válido.");
                hayErrores = true;
            }

            // VALIDACIÓN: Asunto (si existe)
            if (asuntoInput && asunto.length < 3) {
                mostrarError(asuntoInput, "El asunto debe tener al menos 3 caracteres.");
                hayErrores = true;
            }

            // VALIDACIÓN: Mensaje
            if (mensaje.length < 10) {
                mostrarError(mensajeInput, "El mensaje debe tener al menos 10 caracteres.");
                hayErrores = true;
            }

            // DETENER ENVÍO SI HAY ERRORES
            if (hayErrores) return;

            // ESTADO VISUAL: Botón en modo carga
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.textContent = "Enviando...";
            submitBtn.classList.add("loading");
            submitBtn.disabled = true;

            // SIMULACIÓN DE ENVÍO
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

    // EDAD: Cálculo y validación básica
    if (fechaNacimiento && edadTexto) {
        fechaNacimiento.addEventListener("change", function() {
            const fecha = new Date(fechaNacimiento.value);
            const hoy = new Date();

            if (!isNaN(fecha)) {

                // VALIDACIÓN: Fecha no futura
                if (fecha > hoy) {
                    alert("La fecha de nacimiento no puede ser futura.");
                    fechaNacimiento.value = "";
                    edadTexto.textContent = "";
                    return;
                }

                let edad = hoy.getFullYear() - fecha.getFullYear();
                const mes = hoy.getMonth() - fecha.getMonth();

                if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
                    edad--;
                }

                // VALIDACIÓN: Edad mínima
                if (edad < 1) {
                    alert("Debes tener al menos 1 año de edad.");
                    fechaNacimiento.value = "";
                    edadTexto.textContent = "";
                    return;
                }

                edadTexto.textContent = "Edad: " + edad + " años";
            } else {
                edadTexto.textContent = "";
            }
        });
    }

    // INFO EXTRA: Mostrar / ocultar información adicional
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

    // NAVEGACIÓN: Enlace activo y transición visual
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

    // SCROLL: Menú dinámico y botón subir
    const nav = document.querySelector("nav");
    const btn = document.getElementById("btnSubir");

    window.addEventListener("scroll", () => {
        if (nav) nav.classList.toggle("scrolled", window.scrollY > 100);
        if (btn) btn.style.display = window.scrollY > 300 ? "flex" : "none";
    });

    // BOTÓN SUBIR: Scroll suave
    if (btn) {
        btn.addEventListener("click", () => {
            btn.style.transform = "rotate(360deg)";
            btn.style.transition = "transform 0.5s ease";
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => btn.style.transform = "rotate(0deg)", 500);
        });
    }

    // ANIMACIONES: Activación al hacer scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in, .imagen, section, article');
        elements.forEach((element, index) => {
            if (element.getBoundingClientRect().top < window.innerHeight - 150) {
                element.classList.add('visible');
                if (element.classList.contains('imagen')) {
                    element.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }

    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll();

    // MOUSE TRACKING: Efectos visuales
    const cards = document.querySelectorAll('.imagen, article');
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });

    // PÁGINA: Fundido inicial
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    setTimeout(() => document.body.style.opacity = '1', 100);
});
