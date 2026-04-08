from flask import Flask, request
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 👉 Página principal
@app.route("/")
def inicio():
    return """
    <style>
    body {
        background: linear-gradient(135deg, #ff007f, #ff1493);
        font-family: Arial;
        text-align: center;
        color: white;
    }

    .contenedor {
        margin-top: 100px;
    }

    .caja {
        background: black;
        padding: 20px;
        border-radius: 10px;
        display: inline-block;
    }

    button {
        background: white;
        color: black;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover {
        background: #ddd;
    }
    </style>

    <div class="contenedor">
            <h1>Nat Nation Sneakers</h1>
            <p>Bienvenido a mi tienda</p>

             <div class="caja">
            <a href="/descuento">
                <button>🎁 Obtener 10% de descuento</button>
            </a>
        </div>
    </div>
    """


# 👉 Página para ingresar correo
@app.route("/descuento")
def descuento():
    return """
    <style>
    body {
        background: linear-gradient(135deg, #ff4da6, #ff80bf);
        font-family: Arial;
        text-align: center;
        color: white;
    }

  .contenedor {
        margin-top: 100px;
    }

    .caja {
        background: black;
        padding: 20px;
        border-radius: 10px;
        display: inline-block;
    }

    input {
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
        border: none;
    }

    button {
        background: white;
        color: black;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover {
        background: #ddd;
    }
    </style>

    <div class="contenedor">
        <div class="caja">
            <h2>Obtén tu 10% de descuento 🎁</h2>

            <form action="/guardar_correo" method="POST">
                <input type="email" name="correo" placeholder="Ingresa tu correo" required><br>
                <button type="submit">Obtener descuento</button>
            </form>
        </div>
    </div>
    """

# 👉 Guardar correo
@app.route("/guardar_correo", methods=["POST"])
def guardar_correo():
    correo = request.form["correo"]

    conn = sqlite3.connect("tienda.db")
    cursor = conn.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS usuarios (correo TEXT, password TEXT, uso_cupon INTEGER)")

    cursor.execute("SELECT * FROM usuarios WHERE correo = ?", (correo,))
    existe = cursor.fetchone()

    if existe:
        mensaje = "⚠️ Este correo ya está registrado"
    else:
        cursor.execute("INSERT INTO usuarios (correo, password, uso_cupon) VALUES (?,?,?)", (correo, "", 0))
        mensaje = "✅ Correo guardado correctamente"

    conn.commit()
    conn.close()

    return f""" 
    <style>
    body {{
        background: linear-gradient(135deg, #ff4da6, #ff80bf);
        font-family: Arial;
        text-align: center;
        color: white;
    }}
    </style>

    <div class="contenedor">
        <div class="caja">
            <h3>🎉 Tu código es: BIENVENIDO10</h3>
            <p>{mensaje}</p>
          <a href="https://natnation-sneakers.onrender.com/#tienda">
    <button>Volver a la tienda</button>
</a>
        </div>
    </div>
    """

@app.route("/validar_cupon", methods=["POST"])
def validar_cupon():
    correo = request.form["correo"]
    codigo = request.form["codigo"]

    # validar código
    if codigo != "BIENVENIDO10":
        return "NO_EXISTE"

    conn = sqlite3.connect("tienda.db")
    cursor = conn.cursor()

    cursor.execute("SELECT uso_cupon FROM usuarios WHERE correo = ?", (correo,))
    resultado = cursor.fetchone()

    if resultado:
        if resultado[0] == 0:
            conn.commit()
            mensaje = "OK"
        else:
            mensaje = "YA_USADO"
    else:
        mensaje = "NO_EXISTE"

    conn.close()
    return mensaje

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)

