/* ============================================================
   GrocerQuick POS — script.js
   JavaScript vanilla: sin librerías, solo DOM + eventos.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------------------------------------------
     1) CAMBIO ENTRE VISTA PRINCIPAL Y VISTA DE LOGIN
     El botón "Login" oculta el <main> y muestra la sección
     #vistaLogin. "Volver" hace lo contrario.
  ----------------------------------------------------------- */
  const vistaPrincipal = document.getElementById("vistaPrincipal");
  const vistaLogin = document.getElementById("vistaLogin");
  const footer = document.querySelector(".footer");
  const btnLogin = document.getElementById("btnLogin");
  const btnVolver = document.getElementById("btnVolver");

  function mostrarLogin() {
    vistaPrincipal.classList.add("oculto");
    footer.classList.add("oculto");
    vistaLogin.classList.remove("oculto");
    window.scrollTo({ top: 0 });
  }

  function mostrarPrincipal() {
    vistaLogin.classList.add("oculto");
    vistaPrincipal.classList.remove("oculto");
    footer.classList.remove("oculto");
    window.scrollTo({ top: 0 });
  }

  btnLogin.addEventListener("click", mostrarLogin);
  btnVolver.addEventListener("click", mostrarPrincipal);

  /* -----------------------------------------------------------
     2) NAVEGACIÓN INTERNA (scroll suave a secciones)
     Cualquier elemento con [data-scroll] lleva a la sección
     indicada en su "href" o en "data-target".
  ----------------------------------------------------------- */
  const enlacesScroll = document.querySelectorAll("[data-scroll]");

  enlacesScroll.forEach((enlace) => {
    enlace.addEventListener("click", (evento) => {
      const destinoId = enlace.dataset.target || enlace.getAttribute("href");
      const destino = document.querySelector(destinoId);
      if (!destino) return;

      evento.preventDefault();

      // Si estábamos en la vista de login, regresamos primero
      if (!vistaLogin.classList.contains("oculto")) {
        mostrarPrincipal();
      }

      destino.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* -----------------------------------------------------------
     3) EFECTO "TILT" — las tarjetas reaccionan al mouse
     Al mover el mouse sobre cada tarjeta, la inclinamos
     ligeramente según la posición del cursor (efecto 3D).
  ----------------------------------------------------------- */
  const tarjetas = document.querySelectorAll("[data-tilt]");

  tarjetas.forEach((tarjeta) => {
    tarjeta.addEventListener("mousemove", (evento) => {
      const rect = tarjeta.getBoundingClientRect();
      const x = evento.clientX - rect.left;      // posición del mouse en X
      const y = evento.clientY - rect.top;       // posición del mouse en Y

      const centroX = rect.width / 2;
      const centroY = rect.height / 2;

      const rotarY = ((x - centroX) / centroX) * 6;   // grados max ±6
      const rotarX = ((centroY - y) / centroY) * 6;

      tarjeta.style.transform =
        `perspective(600px) rotateX(${rotarX}deg) rotateY(${rotarY}deg) translateY(-4px)`;
    });

    tarjeta.addEventListener("mouseleave", () => {
      tarjeta.style.transform = "perspective(600px) rotateX(0) rotateY(0) translateY(0)";
    });
  });

  /* -----------------------------------------------------------
     4) LA ILUSTRACIÓN DEL HERO TAMBIÉN SIGUE AL MOUSE
     Se inclina suavemente según la posición del cursor
     dentro de todo el bloque .hero__arte.
  ----------------------------------------------------------- */
  const heroArte = document.getElementById("heroArte");
  const terminal = heroArte.querySelector(".terminal");

  heroArte.addEventListener("mousemove", (evento) => {
    const rect = heroArte.getBoundingClientRect();
    const x = evento.clientX - rect.left;
    const y = evento.clientY - rect.top;

    const rotarY = ((x - rect.width / 2) / rect.width) * 20;
    const rotarX = ((rect.height / 2 - y) / rect.height) * 14;

    terminal.style.transform = `rotateY(${rotarY}deg) rotateX(${rotarX}deg)`;
  });

  heroArte.addEventListener("mouseleave", () => {
    terminal.style.transform = "rotateY(-8deg) rotateX(4deg)";
  });

  /* -----------------------------------------------------------
     5) FORMULARIO DE CONTACTO (validación simple + mensaje)
  ----------------------------------------------------------- */
  const formContacto = document.getElementById("formContacto");
  const mensajeEstado = document.getElementById("mensajeEstado");

  formContacto.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nombre = formContacto.nombre.value.trim();

    mensajeEstado.textContent = `¡Gracias, ${nombre}! Te responderemos pronto.`;
    formContacto.reset();
  });

  /* -----------------------------------------------------------
     6) FORMULARIO DE LOGIN (validación simple, sin backend)
  ----------------------------------------------------------- */
  const formLogin = document.getElementById("formLogin");
  const loginEstado = document.getElementById("loginEstado");

  formLogin.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();

    if (usuario === "" || contrasena === "") {
      loginEstado.textContent = "Completa usuario y contraseña.";
      loginEstado.style.color = "#c0392b";
      return;
    }

    loginEstado.style.color = "";
    loginEstado.textContent = `Bienvenido, ${usuario} (demo, sin backend real).`;
  });

});