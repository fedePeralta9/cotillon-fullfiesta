const URL = "http://127.0.0.1:5000/";

// Realizamos la solicitud GET al servidor para obtener todos los productos
fetch(URL + 'productos')
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            // Si hubo un error, lanzar explícitamente una excepción
            // para ser "catcheada" más adelante
            throw new Error('Error al obtener los productos.');
        }
    })
    .then(function (data) {
        const galeria_productos = document.querySelector(".galeria_productos");
        let pageProduct = document.querySelector('.page_product');

        // Iteramos sobre los productos y creamos elementos de div
        for (let producto of data) {
            let divItem = document.createElement('div');
            divItem.className = `itembox ${producto.nombre_categoria.toLowerCase()}`;
            divItem.setAttribute('data-items', producto.nombre_categoria.toLowerCase());

            let img = document.createElement('img');
            img.src = `/static/img/${producto.imagen_url}`;
            img.alt = producto.descripcion;

            divItem.appendChild(img);
            pageProduct.appendChild(divItem);
        }

        const itemboxes = document.querySelectorAll(".itembox");
        console.log(itemboxes);

        // evento de filtrado
        galeria_productos.addEventListener("click", (e) => {
            console.log(e);

            if (e.target.classList.contains("filter")) {
                galeria_productos.querySelector(".active").classList.remove("active");

                e.target.classList.add("active");

                const filterValue = e.target.getAttribute("data-filter");

                console.log(filterValue);

                itemboxes.forEach(item => {
                    if (item.classList.contains(filterValue) || filterValue === "todos") {
                        item.classList.add("show");
                        item.classList.remove("hide");
                    } else {
                        item.classList.add("hide");
                    }
                });
            }
        });
    })
    .catch(function (error) {
        // En caso de error
        alert('Error al obtener los productos.');
        console.error('Error:', error);
    });
