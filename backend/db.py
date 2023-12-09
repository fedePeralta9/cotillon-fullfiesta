import mysql.connector


class Catalogo:
    # Constructor de la clase
    def __init__(self, host, user, password, database):
        # Primero, establecemos una conexión sin especificar la base de datos
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password
        )
        self.cursor = self.conn.cursor()
        
        # Intentamos seleccionar la base de datos
        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
            # Si la base de datos no existe, la creamos
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise err


        # Una vez que la base de datos está establecida, creamos la tabla si no existe
        self.cursor.execute('''CREATE TABLE IF NOT EXISTS categorias (
            id_categoria INT PRIMARY KEY,
            nombre_categoria VARCHAR(50) NOT NULL
        )''')

        self.cursor.execute('''CREATE TABLE IF NOT EXISTS productos (
            codigo INT PRIMARY KEY,
            descripcion VARCHAR(255) NOT NULL,
            cantidad INT NOT NULL,
            precio DECIMAL(10, 2) NOT NULL,
            imagen_url VARCHAR(255),
            id_categoria INT,
            FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria))''')
        self.conn.commit()


        # Cerrar el cursor inicial y abrir uno nuevo con el parámetro dictionary=True
        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)


    #----------------------------------------------------------------
    def listar_productos(self):
        self.cursor.execute("SELECT p.*, c.nombre_categoria FROM productos p LEFT JOIN categorias c ON p.id_categoria = c.id_categoria")
        productos = self.cursor.fetchall()
        return productos
    
    #----------------------------------------------------------------
    def listar_categorias(self):
        self.cursor.execute("SELECT * FROM categorias")
        categorias = self.cursor.fetchall()
        return categorias
    #----------------------------------------------------------------
    def consultar_producto(self, codigo):
        # Consultamos un producto a partir de su código
        self.cursor.execute(f"SELECT p.*, c.nombre_categoria FROM productos p LEFT JOIN categorias c ON p.id_categoria = c.id_categoria WHERE codigo = {codigo}")
        return self.cursor.fetchone()


    #----------------------------------------------------------------
    def mostrar_producto(self, codigo):
        # Mostramos los datos de un producto a partir de su código
        producto = self.consultar_producto(codigo)
        if producto:
            print("-" * 40)
            print(f"Código.....: {producto['codigo']}")
            print(f"Descripción: {producto['descripcion']}")
            print(f"Cantidad...: {producto['cantidad']}")
            print(f"Precio.....: {producto['precio']}")
            print(f"Imagen.....: {producto['imagen_url']}")
            print(f"Categoría..: {producto['nombre_categoria']}")
            print("-" * 40)
        else:
            print("Producto no encontrado.")

    #----------------------------------------------------------------
    def agregar_categoria(self, id_categoria, nombre_categoria):
        self.cursor.execute(f"SELECT * FROM categorias WHERE id_categoria = {id_categoria}")
        categoria_existe = self.cursor.fetchone()
        if categoria_existe:
            return False

        sql = "INSERT INTO categorias (id_categoria, nombre_categoria) VALUES (%s, %s)"
        valores = (id_categoria, nombre_categoria)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return True
    
    #----------------------------------------------------------------
    def agregar_producto(self, codigo, descripcion, cantidad, precio, imagen, id_categoria):
        self.cursor.execute(f"SELECT * FROM productos WHERE codigo = {codigo}")
        producto_existe = self.cursor.fetchone()
        if producto_existe:
            return False
        
        sql = "INSERT INTO productos (codigo, descripcion, cantidad, precio, imagen_url, id_categoria) VALUES (%s, %s, %s, %s, %s, %s)"
        valores = (codigo, descripcion, cantidad, precio, imagen, id_categoria)
        self.cursor.execute(sql,valores)
        self.conn.commit()
        return True

    #----------------------------------------------------------------
    def eliminar_producto(self, codigo):
        # Eliminamos un producto de la tabla a partir de su código
        self.cursor.execute(f"DELETE FROM productos WHERE codigo = {codigo}")
        self.conn.commit()
        return self.cursor.rowcount > 0

    #----------------------------------------------------------------
    def modificar_producto(self, codigo, nueva_descripcion, nueva_cantidad, nuevo_precio, nueva_imagen, nueva_categoria):
        sql = "UPDATE productos SET descripcion = %s, cantidad = %s, precio = %s, imagen_url = %s, id_categoria = %s WHERE codigo = %s"
        valores = (nueva_descripcion, nueva_cantidad, nuevo_precio, nueva_imagen, nueva_categoria, codigo)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.rowcount > 0