let carrito = 0;

function Agregar(boton) {
    boton.innerText = "Agregado 🛒";
    boton.style.background = "green";

    carrito++;
    document.getElementById("contador").innerText = carrito;
}