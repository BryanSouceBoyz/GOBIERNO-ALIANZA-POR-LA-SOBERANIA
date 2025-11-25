document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("nav-toggle");
    const navRight = document.getElementById("nav-right");
    const searchToggle = document.getElementById("search-toggle");
    const searchForm = document.getElementById("search-form");
    const header = document.getElementById("site-header");

    // Menú móvil
    if (navToggle && navRight) {
        navToggle.addEventListener("click", () => {
            navRight.classList.toggle("nav-open");
            navToggle.classList.toggle("nav-toggle-open");
        });
    }

    // --- BUSCADOR ---
    // 1) Mostrar/ocultar input con el botón
    if (searchToggle && searchForm) {
        searchToggle.addEventListener("click", () => {
            const isOpen = searchForm.classList.contains("search-open");
            const input = searchForm.querySelector("input");
            if (!isOpen) {
                searchForm.classList.add("search-open");
                if (input) input.focus();
            } else {
                // Si ya está abierto:
                if (input && input.value.trim() !== "") {
                    // dispara el submit para buscar
                    searchForm.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
                } else {
                    // si está vacío, se cierra
                    searchForm.classList.remove("search-open");
                }
            }
        });
    }

    // 2) Mapeo de palabras de búsqueda -> secciones detalle.html
    const searchIndex = [
        // TOP MENU
        { seccion: "centro", terms: ["el centro", "centro"] },
        { seccion: "programas", terms: ["programas", "programa"] },
        { seccion: "historias", terms: ["historias", "historia"] },
        { seccion: "sobre-nosotros", terms: ["acerca de nosotros", "sobre nosotros", "sobre el drin tim"] },
        { seccion: "apoyanos", terms: ["apoyanos", "apóyanos", "donaciones", "donar", "apoyo"] },

        // TIENDA
        { seccion: "tienda", terms: ["tienda", "shop", "tienda de la fundación", "la tienda"] },

        // FUNDACIÓN
        { seccion: "acerca", terms: ["acerca de", "fundación", "la fundación"] },
        { seccion: "mision-valores", terms: ["mision", "misión", "valores", "mision y valores", "misión y valores"] },
        { seccion: "liderazgo", terms: ["liderazgo", "lideres", "líderes"] },
        { seccion: "prensa-medios", terms: ["prensa", "medios", "prensa y medios"] },
        { seccion: "administracion", terms: ["administracion", "administración", "la administracion", "la administración"] },

        // FINANCIERA
        { seccion: "informes-anuales", terms: ["informes anuales", "informes", "reporte anual"] },
        { seccion: "info-financiera", terms: ["informacion financiera", "información financiera", "finanzas", "financiera"] },

        // INVOLÚCRATE
        { seccion: "formas-donar", terms: ["formas de donar", "como donar", "forma de donar"] },
        { seccion: "oportunidades-laborales", terms: ["oportunidades laborales", "empleo", "trabajo", "vacantes"] },
        { seccion: "info-proveedor", terms: ["informacion del proveedor", "información del proveedor", "proveedor", "proveedores"] },
        { seccion: "organizar-evento", terms: ["organizar un evento", "evento", "organizar evento"] },
        { seccion: "suscripcion-boletines", terms: ["suscripcion a boletines", "suscripción a boletines", "boletines", "newsletter"] },
        { seccion: "faq", terms: ["preguntas frecuentes", "faq", "dudas"] },
        { seccion: "contacto", terms: ["contacto", "contactar", "contactanos", "contáctanos"] }
    ];

    // 3) Lógica de búsqueda (submit del form)
    if (searchForm) {
        searchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const input = searchForm.querySelector("input");
            if (!input) return;
            const query = input.value.trim().toLowerCase();
            if (query === "") return;

            let targetSeccion = null;

            for (const item of searchIndex) {
                for (const term of item.terms) {
                    if (query.includes(term.toLowerCase())) {
                        targetSeccion = item.seccion;
                        break;
                    }
                }
                if (targetSeccion) break;
            }

            if (targetSeccion) {
                window.location.href = "detalle.html?seccion=" + encodeURIComponent(targetSeccion);
            } else {
                alert("No se encontró ninguna sección relacionada con tu búsqueda.");
            }
        });
    }

    // Scroll suave para los enlaces internos tipo #algo (por si usas alguno en index)
    const internalLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    internalLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            if (!href || !href.startsWith("#")) return;

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (!targetElement) return;

            event.preventDefault();

            const headerHeight = header ? header.offsetHeight : 0;
            const elementTop = targetElement.getBoundingClientRect().top + window.scrollY;
            const offset = elementTop - headerHeight - 10;

            window.scrollTo({
                top: offset,
                behavior: "smooth"
            });

            if (navRight && navRight.classList.contains("nav-open")) {
                navRight.classList.remove("nav-open");
                navToggle.classList.remove("nav-toggle-open");
            }
        });
    });

    // --------- CONTENIDOS DE detalle.html ---------
    const params = new URLSearchParams(window.location.search);
    const seccion = params.get("seccion");

    const titleEl = document.getElementById("detail-title");
    const categoryEl = document.getElementById("detail-category");
    const introEl = document.getElementById("detail-intro");
    const bodyEl = document.getElementById("detail-body");

    if (seccion && titleEl && categoryEl && introEl && bodyEl) {
        const dataMap = {
            // TOP MENU
            "centro": {
                category: "El centro",
                title: "El centro",
                intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sodales arcu sit amet lorem facilisis.",
                body: `
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos delectus assumenda perferendis inventore. Molestiae itaque magnam, minus perspiciatis repellat fugiat.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique, neque in dictum consectetur, lorem mauris volutpat leo, eget porta erat sapien et metus.</p>
                `
            },
            "programas": {
                category: "Programas",
                title: "Programas",
                intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent bibendum mauris sed lorem tincidunt tempor.",
                body: `
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur fuga neque ipsam exercitationem odit alias facere cumque.</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos similique commodi sit, cupiditate cumque soluta molestias corporis.</p>
                `
            },
            "historias": {
                category: "Historias",
                title: "Historias",
                intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim lacus non augue ultricies hendrerit.",
                body: `
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet repellendus aliquid dolorum consectetur laudantium reiciendis.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquam, ipsum a pretium lobortis, lorem nunc ultrices ligula, vel sodales nulla dolor sed orci.</p>
                `
            },
            "sobre-nosotros": {
                category: "Gobierno Drin Tim",
                title: "Acerca de nosotros",
                intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consequat, ligula non tempor interdum, arcu orci lacinia felis.",
                body: `
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, a! Praesentium, aliquam?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe debitis reiciendis nam cupiditate, numquam omnis rem.</p>
                `
            },
            "apoyanos": {
                category: "Apóyanos",
                title: "Apóyanos",
                intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod lacus eget turpis feugiat, quis pretium justo placerat.",
                body: `
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, cum. Dolorem voluptatibus eveniet neque.</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas, perferendis. Atque repellat alias vel facere.</p>
                `
            },

            // TIENDA
            "tienda": {
                category: "La Fundación",
                title: "La tienda de la Fundación",
                intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sodales arcu sit amet lorem facilisis, a iaculis nulla placerat.",
                body: `
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos delectus assumenda perferendis inventore. Molestiae itaque magnam, minus perspiciatis repellat fugiat.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique, neque in dictum consectetur, lorem mauris volutpat leo, eget porta erat sapien et metus.</p>
                `
            },

            // FUNDACIÓN
            "acerca": {
                category: "La Fundación",
                title: "Acerca de",
                intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sodales arcu sit amet lorem facilisis, a iaculis nulla placerat.",
                body: `
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos delectus assumenda perferendis inventore. Molestiae itaque magnam, minus perspiciatis repellat fugiat.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique, neque in dictum consectetur, lorem mauris volutpat leo, eget porta erat sapien et metus.</p>
                `
            },
            "mision-valores": {
                category: "La Fundación",
                title: "Nuestra misión y valores",
                intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent bibendum mauris sed lorem tincidunt tempor.",
                body: `
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur fuga neque ipsam exercitationem odit alias facere cumque.</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos similique commodi sit, cupiditate cumque soluta molestias corporis.</p>
                `
            },
            "liderazgo": {
                category: "La Fundación",
                title: "Liderazgo",
                intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim lacus non augue ultricies hendrerit.",
                body: `
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet repellendus aliquid dolorum consectetur laudantium reiciendis.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquam, ipsum a pretium lobortis, lorem nunc ultrices ligula, vel sodales nulla dolor sed orci.</p>
                `
            },
            "prensa-medios": {
                category: "La Fundación",
                title: "Prensa y medios",
                intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consequat, ligula non tempor interdum, arcu orci lacinia felis.",
                body: `
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, a! Praesentium, aliquam?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe debitis reiciendis nam cupiditate, numquam omnis rem.</p>
                `
            },
            "administracion": {
                category: "La Fundación",
                title: "La administración",
                intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod lacus eget turpis feugiat, quis pretium justo placerat.",
                body: `
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, cum. Dolorem voluptatibus eveniet neque.</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas, perferendis. Atque repellat alias vel facere.</p>
                `
            },

            // FINANCIERA
            "informes-anuales": {
                category: "Financiera",
                title: "Informes anuales",
                intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut egestas, purus a consequat ultricies, ligula libero blandit leo.",
                body: `
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, accusamus. Impedit, porro vero!</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur sequi quae magnam repellendus odit!</p>
                `
            },
            "info-financiera": {
                category: "Financiera",
                title: "Información financiera",
                intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent varius nibh ut placerat eleifend.",
                body: `
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo atque natus voluptatibus, nisi amet nam.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac imperdiet nibh, non dapibus nisl.</p>
                `
            },

            // INVOLÚCRATE
            "formas-donar": {
                category: "Involúcrate",
                title: "Formas de donar",
                intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur dictum justo, eget facilisis lacus mattis et.",
                body: `
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum asperiores esse rem molestias consequuntur.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, exercitationem. Dolore, ipsum expedita?</p>
                `
            },
            "oportunidades-laborales": {
                category: "Involúcrate",
                title: "Oportunidades laborales",
                intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consequat elit at nisl gravida consequat.",
                body: `
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perferendis adipisci expedita rem.</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos ut accusamus ab facilis alias.</p>
                `
            },
            "info-proveedor": {
                category: "Involúcrate",
                title: "Información del proveedor",
                intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus lacus nec odio volutpat congue.",
                body: `
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, optio. Nesciunt neque veritatis tenetur.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat dolores ratione omnis numquam quam.</p>
                `
            },
            "organizar-evento": {
                category: "Involúcrate",
                title: "Organizar un evento",
                intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris suscipit, dui vitae molestie dapibus.",
                body: `
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos hic placeat dolor beatae.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti minima impedit quasi?</p>
                `
            },
            "suscripcion-boletines": {
                category: "Involúcrate",
                title: "Suscripción a boletines",
                intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in sagittis tortor.",
                body: `
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, recusandae dolores? Nesciunt, odit.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quaerat cupiditate exercitationem?</p>
                `
            },
            "faq": {
                category: "Involúcrate",
                title: "Preguntas frecuentes",
                intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis orci nec arcu convallis pulvinar.",
                body: `
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto est magni cupiditate.</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia, cumque.</p>
                `
            },
            "contacto": {
                category: "Involúcrate",
                title: "Contacto",
                intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia finibus leo, vitae lacinia magna porta at.",
                body: `
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet at iusto cumque!</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, in maxime. Officia, magni.</p>
                `
            }
        };

        const data = dataMap[seccion];

        if (data) {
            categoryEl.textContent = data.category;
            titleEl.textContent = data.title;
            introEl.textContent = data.intro;
            bodyEl.innerHTML = data.body;
            document.title = data.title + " - Gobierno Futuro Nacional";
        } else {
            categoryEl.textContent = "Sección no encontrada";
            titleEl.textContent = "Contenido no disponible";
            introEl.textContent = "La sección solicitada no existe o ha sido movida.";
            bodyEl.innerHTML = "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, omnis.</p>";
        }
    }
});
