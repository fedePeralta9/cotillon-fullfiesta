from flask import Flask
from flask_cors import CORS
from db import Catalogo
import os



app = Flask(__name__)
CORS(app) # Esto habilitará CORS para todas las rutas

catalogo = Catalogo(host='localhost', user='root', password='', database='miapp')


ruta_actual = os.path.dirname(os.path.abspath(__file__))
# Carpeta para guardar las imagenes
ruta_destino = os.path.join(ruta_actual, '../static/img/')


from routes import *

if __name__ == "__main__":
    app.run(debug=True)