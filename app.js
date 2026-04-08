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

let carrito = [];

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

window.onload = function () {
    setTimeout(() => {
        document.getElementById("loader").classList.add("oculto");
        document.getElementById("contenido").classList.add("visible");
    }, 800);
};

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

  fetch("http://127.0.0.1:5016/comprar", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "correo=" + correo
  })
  .then(() => {
    window.location.href = url;
  });
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
});

function toggleUser() {
    const panel = document.getElementById("panel-user");
    panel.classList.toggle("activo");
}

function abrirPromo() {
   window.location.href = "http://127.0.0.1:5016/descuento";
}

function aplicarCupon() {
  let codigo = document.getElementById("cupon").value.trim().toUpperCase();
  let correo = localStorage.getItem("correo");

  if (!correo) {
    alert("⚠️ Debes registrarte primero");
    return;
  }

  fetch("http://127.0.0.1:5016/validar_cupon", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "correo=" + encodeURIComponent(correo) + "&codigo=" + encodeURIComponent(codigo)
  })
  .then(res => res.text())
  .then(data => {

    if (data === "OK") {
      let totalElemento = document.getElementById("total-precio");
      let total = parseFloat(totalElemento.innerText) || 0;

      let nuevoTotal = total * 0.90;
      totalElemento.innerText = nuevoTotal.toFixed(2);

      alert("🎉 Descuento aplicado");
    } 
    else if (data === "YA_USADO") {
      alert("⚠️ Ya usaste este cupón");
    } 
    else {
      alert("❌ Cupón inválido");
    }
  });
}

function registrarUsuario() {
  let correo = document.getElementById("correoInput").value;
  let password = document.getElementById("passwordInput").value;

  if (!correo || !password) {
    alert("⚠️ Llena todos los campos");
    return;
  }

  localStorage.setItem("correo", correo);

  fetch("http://127.0.0.1:5016/registro_usuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "correo=" + correo + "&password=" + password
  })
  .then(res => res.text())
  .then(() => {
    alert("✅ Registrado");
  });
}

function mostrarUsuario(correo) {
    let panel = document.getElementById("panel-user");

    panel.innerHTML = `
        <h3>👤 Bienvenido</h3>
        <p>${correo}</p>
        <button onclick="cerrarSesion()">Cerrar sesión</button>
    `;

    panel.classList.add("activo");
    document.getElementById("overlay").classList.add("activo");
}

function cerrarSesion() {
    localStorage.removeItem("correo");
    location.reload();
}

window.addEventListener("load", function () {

  setTimeout(() => {
    document.getElementById("loader").classList.add("oculto");
    document.getElementById("contenido").classList.add("visible");
  }, 800);

  let correo = localStorage.getItem("correo");
  let input = document.getElementById("correoInput");

  if (correo && input) {
    input.value = correo;
  }

});

function abrirLoginFull() {
    document.getElementById("login-full").classList.add("activo");
}

function cerrarLoginFull() {
    document.getElementById("login-full").classList.remove("activo");
}

window.addEventListener("load", function () {

    document.querySelector(".fb").addEventListener("click", () => {
        alert("Login con Facebook próximamente 🔥");
    });

    document.querySelector(".apple").addEventListener("click", () => {
        alert("Login con Apple próximamente 🍏");
    });

    document.querySelector(".google").addEventListener("click", () => {
        alert("Login con Google próximamente 🌎");
    });

});

function mostrarRegistro() {
    alert("Aquí puedes crear tu cuenta 🔥");
}