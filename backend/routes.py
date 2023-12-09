from flask import jsonify, request, session
from app import app, catalogo, ruta_destino
import os
import time
from werkzeug.utils import secure_filename

#--------------------------------------------------------------------
@app.route("/login", methods=["POST"])
def login():
    # Obtén los datos del formulario de inicio de sesión
    username = request.form['username']
    password = request.form['password']

    # Si las credenciales son válidas, redirige a la página de administrador
    if username == "admin" and password == "1234":
        return jsonify({"mensaje": "Inicio de sesión exitoso"}), 200
    else:
        return jsonify({"mensaje": "Credenciales incorrectas"}), 401

#--------------------------------------------------------------------
@app.route("/logout", methods=["POST"])
def logout():
    # Verifica si el usuario está autenticado
    if 'username' in session:
        # Elimina la información de la sesión
        session.clear()
        return jsonify({"mensaje": "Sesión cerrada con éxito"}), 200
    else:
        return jsonify({"mensaje": "No hay una sesión activa"}), 400

#--------------------------------------------------------------------
@app.route("/productos", methods=["GET"])
def listar_productos():
    productos = catalogo.listar_productos()
    return jsonify(productos)

#--------------------------------------------------------------------
@app.route("/categorias", methods=["GET"])
def listar_categorias():
    categorias = catalogo.listar_categorias()
    return jsonify(categorias)

#--------------------------------------------------------------------
@app.route("/productos/<int:codigo>", methods=["GET"])
def mostrar_producto(codigo):
    catalogo.mostrar_producto(codigo)
    producto = catalogo.consultar_producto(codigo)
    if producto:
        return jsonify(producto)
    else:
        return "Producto no encontrado", 404

#--------------------------------------------------------------------
@app.route("/categorias", methods=["POST"])
def agregar_categoria():
    # Recojo los datos del form
    id_categoria = request.form['id_categoria']
    nombre_categoria = request.form['nombre_categoria']

    if catalogo.agregar_categoria(id_categoria, nombre_categoria):
        return jsonify({"mensaje": "Categoría agregada"}), 201
    else:
        return jsonify({"mensaje": "Categoría ya existe"}), 400

#--------------------------------------------------------------------
@app.route("/productos", methods=["POST"])
def agregar_producto():
    # Recojo los datos del form
    codigo = request.form['codigo']
    descripcion = request.form['descripcion']
    cantidad = request.form['cantidad']
    precio = request.form['precio']
    id_categoria = request.form['id_categoria']  
    imagen = request.files['imagen']
    nombre_imagen = secure_filename(imagen.filename)
    nombre_base, extension = os.path.splitext(nombre_imagen)
    nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"

    imagen.save(os.path.join(ruta_destino, nombre_imagen))


    if catalogo.agregar_producto(codigo, descripcion, cantidad, precio, nombre_imagen, id_categoria):
        return jsonify({"mensaje": "Producto agregado"}), 201
    else:
        return jsonify({"mensaje": "Producto ya existe"}), 400

#--------------------------------------------------------------------
@app.route("/productos/<int:codigo>", methods=["DELETE"])
def eliminar_producto(codigo):
    # Primero, obtén la información del producto para encontrar la imagen
    producto = catalogo.consultar_producto(codigo)
    if producto:
        # Eliminar la imagen asociada si existe
        ruta_imagen = os.path.join(ruta_destino, producto['imagen_url'])
        if os.path.exists(ruta_imagen):
            os.remove(ruta_imagen)


        # Luego, elimina el producto del catálogo
        if catalogo.eliminar_producto(codigo):
            return jsonify({"mensaje": "Producto eliminado"}), 200
        else:
            return jsonify({"mensaje": "Error al eliminar el producto"}), 500
    else:
        return jsonify({"mensaje": "Producto no encontrado"}), 404

#--------------------------------------------------------------------
@app.route("/productos/<int:codigo>", methods=["PUT"])
def modificar_producto(codigo):
    # Recojo los datos del form
    nueva_descripcion = request.form.get("descripcion")
    nueva_cantidad = request.form.get("cantidad")
    nuevo_precio = request.form.get("precio")
    nueva_categoria = request.form.get("id_categoria")

    # Procesamiento de la imagen solo si se proporciona
    imagen = request.files.get('imagen')
    nombre_imagen = None

    if imagen:
        nombre_imagen = secure_filename(imagen.filename)
        nombre_base, extension = os.path.splitext(nombre_imagen)
        nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
        imagen.save(os.path.join(ruta_destino, nombre_imagen))

    # Consultar el producto actual
    producto_actual = catalogo.consultar_producto(codigo)

    if not producto_actual:
        return jsonify({"mensaje": "Producto no encontrado"}), 404

    # Usar la imagen actual si no se proporciona una nueva imagen
    nombre_imagen = nombre_imagen or producto_actual['imagen_url']

    # Actualización del producto
    if catalogo.modificar_producto(codigo, nueva_descripcion, nueva_cantidad, nuevo_precio, nombre_imagen, nueva_categoria):
        return jsonify({"mensaje": "Producto modificado"}), 200
    else:
        return jsonify({"mensaje": "Error al modificar el producto"}), 500

