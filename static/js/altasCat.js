const URL = "http://127.0.0.1:5000/";

document.getElementById('categoriaForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var formData = new FormData();
    formData.append('id_categoria', document.getElementById('id_categoria').value);
    formData.append('nombre_categoria', document.getElementById('nombre_categoria').value);

    fetch(URL + 'categorias', {
        method: 'POST',
        body: formData
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al agregar la categoría.');
            }
        })
        .then(function () {
            alert('Categoría agregada correctamente.');
        })
        .catch(function (error) {
            alert('Error al agregar la categoría.');
            console.error('Error:', error);
        })
        .finally(function () {
            document.getElementById('id_categoria').value = "";
            document.getElementById('nombre_categoria').value = "";
        });
});
