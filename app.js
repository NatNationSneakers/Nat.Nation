function entrar() {
    const contenido = document.getElementById("contenido");

    contenido.classList.add("zoom-out");

    setTimeout(() => {
        document.getElementById("inicio").style.display = "none";
        document.getElementById("tienda").style.display = "block";
        contenido.classList.remove("zoom-out");
    }, 300);
}

function regresar() {
    document.getElementById("tienda").style.display = "none";
    document.getElementById("inicio").style.display = "flex";
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function actualizarCarrito() {
    let contador = document.getElementById("contador");
    let lista = document.getElementById("lista-carrito");
    let totalElemento = document.getElementById("total-precio");
    let productosElemento = document.getElementById("total-productos");

    lista.innerHTML = "";

    let total = 0;
    let totalProductos = 0;

    carrito.forEach((item, index) => {
        total += item.precio * item.cantidad;
        totalProductos += item.cantidad;

        lista.innerHTML += `
        <li class="item-carrito">
            <div class="contenido-item">
                <img src="${item.imagen}" class="img-carrito">
                <div class="info">
                    <p class="nombre">${item.nombre}</p>
                    <p class="talla">Talla: ${item.talla}</p>
                    <p class="precio">$${item.precio}</p>
                </div>
            </div>

            <div class="acciones">
                <button onclick="cambiarCantidad(${index}, -1)">-</button>
                <span>${item.cantidad}</span>
                <button onclick="cambiarCantidad(${index}, 1)">+</button>
                <button class="btn-eliminar" onclick="eliminar(${index})">🗑️</button>
            </div>
        </li>
        `;
    });

    contador.innerText = totalProductos;
    productosElemento.innerText = totalProductos;
    totalElemento.innerText = total;

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarProducto(nombre, precio, imagen, talla) {
    let productoExistente = carrito.find(p => p.nombre === nombre && p.talla === talla);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio, imagen, talla, cantidad: 1 });
    }

    actualizarCarrito();
}

function cambiarCantidad(index, cambio) {
    carrito[index].cantidad += cambio;

    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }

    actualizarCarrito();
}

function eliminar(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function toggleCarrito() {
    let panel = document.getElementById("panel-carrito");
    panel.classList.toggle("abierto");
}

function Agregar(boton) {
    let card = boton.parentElement;

    let nombre = card.querySelector("h2").innerText;
    let precio = parseFloat(card.querySelector("p").innerText.replace("$", ""));
    let talla = card.querySelector("select").value;
    let imagen = card.querySelector("img").src;

    agregarProducto(nombre, precio, imagen, talla);
}

function irAPagar() {
  let correo = localStorage.getItem("correo");
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (!correo) {
    alert("Primero regístrate");
    return;
  }

  let mensaje = "Hola!, quiero realizar este pedido:\n\n";
  let total = 0;

  carrito.forEach(item => {
    let subtotal = item.precio * item.cantidad;
    mensaje += `• ${item.nombre} (${item.talla}) x${item.cantidad} - $${subtotal}\n`;
    total += subtotal;
  });

  mensaje += `\n💰 Total: $${total}`;
  mensaje += `\n\n¿Cómo puedo realizar el pago? 🙏`;

  let telefono = "5215624570336";
  let url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  window.location.href = url;
}

function animarBanner() {
    let banner = document.getElementById("promoBanner");

    setTimeout(() => {
        setInterval(() => {
            banner.classList.add("oculto");

            setTimeout(() => {
                banner.classList.remove("oculto");
            }, 10000);

        }, 20000);

    }, 8000);
}

// ================== CONTROL PANEL ==================

function toggleUser() {
    const panel = document.getElementById("panel-user");

    let sesion = JSON.parse(localStorage.getItem("sesion"));

    // Si está abierto → cerrar
    if (panel.classList.contains("activo")) {
        panel.classList.remove("activo");
        return;
    }

    // Si está cerrado → cargar contenido
    if (sesion) {
        panel.innerHTML = `
            <button class="btn-cerrar" onclick="cerrarPanelUsuario()">✖</button>
            <h2>Tu cuenta</h2>
            <h3>👤 Bienvenido</h3>
            <p>${sesion.correo}</p>
            <button onclick="irACarrito()">🛒 Ver carrito</button>
            <button onclick="cerrarSesion()">Cerrar sesión</button>
        `;
    } else {
        panel.innerHTML = `
            <button class="btn-cerrar" onclick="cerrarPanelUsuario()">✖</button>
            <h2>Tu cuenta</h2>
            <button onclick="abrirLoginFull()">Iniciar sesión</button>
        `;
    }

    panel.classList.add("activo");
}

function cerrarPanelUsuario() {
    document.getElementById("panel-user").classList.remove("activo");
}


// ================== LOGIN ==================

function abrirLoginFull() {
    document.getElementById("login-full").classList.add("activo");
}

function cerrarLoginFull() {
    document.getElementById("login-full").classList.remove("activo");
}

function iniciarSesion() {
    let correo = document.getElementById("correoLogin").value.trim();
    let password = document.getElementById("passLogin").value.trim();

    if (!correo || !password) {
        alert("⚠️ Llena todos los campos");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let usuario = usuarios.find(u => u.correo === correo && u.password === password);

    if (usuario) {
        localStorage.setItem("sesion", JSON.stringify(usuario));
        alert("✅ Bienvenido");
        cerrarLoginFull();
    } else {
        alert("❌ Datos incorrectos");
    }
}


// ================== REGISTRO ==================

function registrarUsuario() {
    let correo = document.getElementById("correoRegistro").value.trim();
    let password = document.getElementById("passRegistro").value.trim();

    if (!correo || !password) {
        alert("⚠️ Llena todos los campos");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let existe = usuarios.find(u => u.correo === correo);

    if (existe) {
        alert("⚠️ Ese correo ya existe");
        return;
    }

    usuarios.push({ correo, password });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("sesion", JSON.stringify({ correo }));

    alert("✅ Cuenta creada");

    cerrarLoginFull();
}


// ================== UI ==================

function mostrarRegistro() {
    document.getElementById("registro").style.display = "block";
}


// ================== SESIÓN ==================

function cerrarSesion() {
    localStorage.removeItem("sesion");
    location.reload();
}


// ================== LOAD (SIN ERRORES) ==================

window.addEventListener("load", function () {

    // 🔥 Esto evita que se quede congelado el loader
    setTimeout(() => {
        document.getElementById("loader")?.classList.add("oculto");
        document.getElementById("contenido")?.classList.add("visible");
    }, 500);

});

function cerrarCarrito() {
    document.getElementById("carrito").classList.remove("activo");
}