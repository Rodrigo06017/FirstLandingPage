/* ============================================================
   Real Madrid Shop — script.js
   JavaScript vanilla: sin librerías, solo DOM + eventos.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------------------------------------------
     1) CAMBIO ENTRE VISTA PRINCIPAL Y VISTA DE LOGIN
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
     4) FORMULARIO DE CONTACTO (validación simple + mensaje)
  ----------------------------------------------------------- */
  const formContacto = document.getElementById("formContacto");
  const mensajeEstado = document.getElementById("mensajeEstado");

  formContacto.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nombre = formContacto.nombre.value.trim();

    mensajeEstado.textContent = `¡Gracias por contactarnos, ${nombre}! Hala Madrid y nada más.`;
    formContacto.reset();
  });

  /* -----------------------------------------------------------
     5) FORMULARIO DE LOGIN (validación simple, sin backend)
  ----------------------------------------------------------- */
  const formLogin = document.getElementById("formLogin");
  const loginEstado = document.getElementById("loginEstado");

  formLogin.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();

    if (usuario === "" || contrasena === "") {
      loginEstado.textContent = "Completa tu correo y contraseña.";
      loginEstado.style.color = "#c0392b";
      return;
    }

    loginEstado.style.color = "";
    loginEstado.textContent = `Bienvenido, madridista ${usuario}. (Demo, sin backend real)`;
  });

});