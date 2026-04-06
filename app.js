function entrar() {
    document.getElementById("inicio").style.display = "none";
    document.getElementById("tienda").style.display = "block";
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
            <li>
                ${item}
                <button onclick="eliminar(${index})">❌</button>
            </li>
        `;
    });
}

function eliminar(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function Agregar(boton) {
    let card = boton.parentElement;
    let producto = card.querySelector("h2").innerText;
    let talla = card.querySelector("select").value;

    carrito.push(producto + " - " + talla);
    actualizarCarrito();
}