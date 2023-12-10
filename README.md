# cotillon-fullfiesta

Aplicacion web sobre una tienda online de productos de cotillón para fiestas de todo tipo.

## Requisitos Previos

Asegúrate de tener instaladas las siguientes herramientas antes de ejecutar la aplicación:

- Python (última versión)
- Flask
- Flask-CORS
- MySQL Connector
- XAMPP (o cualquier servidor MySQL)

## Configuración del Entorno

1. Instala las dependencias de Python:

``` bash
pip install Flask Flask-CORS mysql-connector-python
```

2. Inicia tu servidor MySQL (por ejemplo, XAMPP) y asegúrate de que esté en ejecución.

## Ejecución del Proyecto

3. Ejecuta el archivo app.py para iniciar el servidor Flask:

python app.py

4. Abre el navegador desde index.html para visualizar la pagina y tambien visita:

- Para ver la base de datos: http://127.0.1.1/phpmyadmin/
- Para acceder al backend: http://127.0.0.1:5000/productos

## Problemas Conocidos

- **Problema 1:** La opción de cerrar sesión no estaria funcionando.

### Limitaciones Actuales

1. **Limitación 1:** No agrega en el front las nuevas categorias si se ingresaran, solo esta limitada para Adornos, Disfraces y Accesorios.
2. **Limitación 2:** No se permite generar usuarios nuevos.
3. **Limitación 3:** No tiene la opcion de eliminar/modificar una categoria.
4. **Limitación 4:** No tiene implementada la opcion de "olvide la contraseña" en el login.
5. **Limitación 5:** Solo muestra las imagenes de los productos, faltaria poner precioc stock, etc.
6. **Limitación 6:** Seguridad debil de la pagina.
