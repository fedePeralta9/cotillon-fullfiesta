const URL = "http://127.0.0.1:5000/";

// Realizamos la solicitud GET al servidor para obtener todas las categorías
fetch(URL + 'categorias')
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al obtener las categorías.');
        }
    })
    .then(function (data) {
        let tablaCategorias = document.getElementById('tablaCategorias');

        // Iteramos sobre las categorías y agregamos filas a la tabla
        for (let categoria of data) {
            let fila = document.createElement('tr');
            fila.innerHTML = '<td>' + categoria.id_categoria + '</td>' +
                '<td>' + categoria.nombre_categoria + '</td>';

            // Agregamos la fila a la tabla
            tablaCategorias.appendChild(fila);
        }
    })
    .catch(function (error) {
        // En caso de error
        alert('Error al obtener las categorías.');
        console.error('Error:', error);
    });
