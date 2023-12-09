const URL = "http://127.0.0.1:5000/"
const app = Vue.createApp({
    data() {
        return {
            productos: []
        }
    },
    methods: {
        obtenerProductos() {
            // Obtenemos el contenido del inventario
            fetch(URL + 'productos')
                .then(response => {
                    // Parseamos la respuesta JSON
                    if (response.ok) { return response.json(); }
                })
                .then(data => {
                    // El código Vue itera este elemento para generar la tabla
                    this.productos = data;
                })
                .catch(error => {
                    console.log('Error:', error);
                    alert('Error al obtener los productos.');
                });
        },
        eliminarProducto(codigo) {
            if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                fetch(URL + `productos/${codigo}`, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            this.productos = this.productos.filter(producto => producto.codigo !== codigo);
                            alert('Producto eliminado correctamente.');
                        }
                    })
                    .catch(error => {
                        alert(error.message);
                    });
            }
        }
    },
    mounted() {
        //Al cargar la página, obtenemos la lista de productos
        this.obtenerProductos();
    }
});
app.mount('body');
