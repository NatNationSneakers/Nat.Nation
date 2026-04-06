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

    contador.innerText = carrito.length;
    lista.innerHTML = "";

    carrito.forEach((item, index) => {
        lista.innerHTML += `
   <li class="item-carrito">
    
    <div class="contenido-item">
        <img src="${item.imagen}" class="img-carrito">

        <div class="info">
            <p class="nombre">${item.nombre}</p>
            <p class="talla">Talla: ${item.talla}</p>
            <p class="precio">${item.precio}</p>
           <div class="control-cantidad">
    <button onclick="cambiarCantidad(${index}, -1)">➖</button>
    <span>${item.cantidad}</span>
    <button onclick="cambiarCantidad(${index}, 1)">➕</button>
</div>
        </div>
    </div>

    <button class="btn-eliminar" onclick="eliminar(${index})">🗑️</button>

</li>
`;
    });
}

function eliminar(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}
function cambiarCantidad(index, cambio) {
    carrito[index].cantidad += cambio;

    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }

    actualizarCarrito();
}

function Agregar(boton) {
    let card = boton.parentElement;
    let producto = card.querySelector("h2").innerText;
    let talla = card.querySelector("select").value;

let precio = card.querySelector("p").innerText;
let imagen = card.querySelector("img").src;

 let existente = carrito.find(item => 
    item.nombre === producto && item.talla === talla
);

if (existente) {
    existente.cantidad++;
} else {
    carrito.push({
        nombre: producto,
        talla: talla,
        precio: precio,
        imagen: imagen,
        cantidad: 1
    });
}

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

li.innerHTML = producto + ' <button class="btn-eliminar" onclick="eliminar(this)">🗑️</button>';