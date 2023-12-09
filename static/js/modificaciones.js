const URL = "http://127.0.0.1:5000/"


const app = Vue.createApp({
    data() {
        return {
            codigo: '',
            descripcion: '',
            cantidad: '',
            precio: '',
            categoria: '',
            imagen_url: '',
            imagenUrlTemp: null,
            mostrarDatosProducto: false,
        };
    },


    methods: {
        obtenerProducto() {
            fetch(URL + 'productos/' + this.codigo)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        //Si la respuesta es un error, lanzamos una excepción para ser "catcheada" más adelante en el catch.
                        throw new Error('Error al obtener los datos del producto.')
                    }
                })


                .then(data => {
                    this.descripcion = data.descripcion;
                    this.cantidad = data.cantidad;
                    this.precio = data.precio;
                    this.categoria = data.id_categoria;
                    this.imagen_url = data.imagen_url;
                    this.mostrarDatosProducto = true;
                })
                .catch(error => {
                    console.log(error);
                    alert('Código no encontrado.');
                })
        },
        seleccionarImagen(event) {
            const file = event.target.files[0];
            this.imagenSeleccionada = file;
            this.imagenUrlTemp = URL.createObjectURL(file); // Crea una URL temporal para la vista previa
        },
        guardarCambios() {
            const formData = new FormData();
            formData.append('codigo', this.codigo);
            formData.append('descripcion', this.descripcion);
            formData.append('cantidad', this.cantidad);
            formData.append('id_categoria', this.categoria);
            formData.append('precio', this.precio);


            if (this.imagenSeleccionada) {
                formData.append('imagen', this.imagenSeleccionada, this.imagenSeleccionada.name);
            }


            //Utilizamos fetch para realizar una solicitud PUT a la API y guardar los cambios.
            fetch(URL + 'productos/' + this.codigo, {
                method: 'PUT',
                body: formData,
            })
                .then(response => {
                    //Si la respuesta es exitosa, utilizamos response.json() para parsear la respuesta en formato JSON.
                    if (response.ok) {
                        return response.json()
                    } else {
                        //Si la respuesta es un error, lanzamos una excepción.
                        throw new Error('Error al guardar los cambios del producto.')
                    }
                })
                .then(data => {
                    alert('Producto actualizado correctamente.');
                    this.limpiarFormulario();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al actualizar el producto.');
                });
        },
        limpiarFormulario() {
            this.codigo = '';
            this.descripcion = '';
            this.cantidad = '';
            this.precio = '';
            this.imagen_url = '';
            this.imagenSeleccionada = null;
            this.imagenUrlTemp = null;
            this.mostrarDatosProducto = false;
        }
    }
});


app.mount('#app');
