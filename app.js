function entrar() {
    document.getElementById("inicio").style.display = "none";
    document.getElementById("tienda").style.display = "block";
}

let contador = 0;

function Agregar() {
    contador++;
    document.getElementById("contador").innerText = contador;
}