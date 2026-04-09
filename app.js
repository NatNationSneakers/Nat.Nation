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

window.addEventListener("load", function () {
    animarBanner();

    let sesion = JSON.parse(localStorage.getItem("sesion"));
    if (sesion) {
        mostrarUsuario(sesion.correo);
    }
});

function toggleUser() {
    const panel = document.getElementById("panel-user");
    panel.classList.toggle("activo");
}

function abrirPromo() {
   window.location.href = "http://127.0.0.1:5016/descuento";
}


// 🔥 LOGIN
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
        mostrarUsuario(usuario.correo);
    } else {
        alert("❌ Datos incorrectos");
    }
}


// 🔥 REGISTRO
function registrarUsuario() {
    let correo = document.querySelector("#registro #correoRegistro")?.value.trim();
    let password = document.querySelector("#registro #passRegistro")?.value.trim();

    if (!correo || !password) {
        alert("⚠️ Llena todos los campos");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let existe = usuarios.find(u => u.correo === correo);

    if (existe) {
        alert("⚠️ Ese correo ya está registrado");
        return;
    }

    usuarios.push({ correo, password });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("sesion", JSON.stringify({ correo }));

    alert("✅ Cuenta creada");

    cerrarLoginFull();
    mostrarUsuario(correo);
}


// UI LOGIN
function mostrarRegistro() {
    document.getElementById("registro").style.display = "block";

    document.getElementById("correoLogin").style.display = "none";
    document.getElementById("passLogin").style.display = "none";
    document.querySelector(".btn-continuar").style.display = "none";
    document.querySelector(".btn-crear").style.display = "none";
}

function volverLogin() {
    document.getElementById("registro").style.display = "none";

    document.getElementById("correoLogin").style.display = "block";
    document.getElementById("passLogin").style.display = "block";
    document.querySelector(".btn-continuar").style.display = "block";
    document.querySelector(".btn-crear").style.display = "block";
}

function abrirLoginFull() {
    document.getElementById("login-full").classList.add("activo");
    volverLogin();
}

function cerrarLoginFull() {
    document.getElementById("login-full").classList.remove("activo");
    volverLogin();
}

function mostrarUsuario(correo) {
    let panel = document.getElementById("panel-user");

    panel.innerHTML = `
        <h3>👤 Bienvenido</h3>
        <p>${correo}</p>
        <button onclick="cerrarSesion()">Cerrar sesión</button>
    `;

    panel.classList.add("activo");
}

function cerrarSesion() {
    localStorage.removeItem("sesion");
    location.reload();
}

window.addEventListener("load", function () {

    // 🔥 QUITAR LOADER
    setTimeout(() => {
        document.getElementById("loader").classList.add("oculto");
        document.getElementById("contenido").classList.add("visible");
    }, 800);

    // 🔥 SESIÓN
    let sesion = JSON.parse(localStorage.getItem("sesion"));
    if (sesion) {
        mostrarUsuario(sesion.correo);
    }

    // 🔥 BANNER
    animarBanner();
});