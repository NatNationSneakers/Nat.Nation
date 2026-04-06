function entrar() {
    document.getElementById("inicio").style.display = "none";
    document.getElementById("tienda").style.display = "block";
}

let contador = 0;

function Agregar(btn) {
    contador++;
    document.getElementById("contador").innerText = contador;
}