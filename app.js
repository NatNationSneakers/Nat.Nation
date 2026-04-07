function entrar() {
    const contenido = document.getElementById("contenido");

    // 🔥 activa el zoom
    contenido.classList.add("zoom-out");

    setTimeout(() => {
        document.getElementById("inicio").style.display = "none";
        document.getElementById("tienda").style.display = "block";

        // 🔄 quitamos zoom para la siguiente vez
        contenido.classList.remove("zoom-out");
    }, 300); // ⏱ mismo tiempo que tu CSS
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

    window.open(url, "_blank");
}