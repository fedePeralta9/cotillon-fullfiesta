const URL = "http://127.0.0.1:5000/";

document.addEventListener('DOMContentLoaded', function () {


    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // Obtén los valores del formulario
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Realiza una solicitud al servidor para iniciar sesión
        fetch(URL + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'username': username,
                'password': password,
            }),
        })
            .then(response => {
                if (response.ok) {
                    // Redirige a la página de administrador si la autenticación es exitosa
                    window.location.href = 'panel_admin.html';
                } else {
                    // Muestra un mensaje de error si las credenciales son incorrectas
                    alert('Credenciales incorrectas');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    });

});

function cerrarSesion() {
    // Verifica si hay una sesión activa antes de realizar la solicitud
    if (sessionStorage.getItem('username')) {
        fetch(URL + 'logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(response => {
                if (response.ok) {
                    alert('Sesión cerrada con éxito');
                    // Elimina la información de la sesión en el cliente
                    sessionStorage.removeItem('username');
                    // Redirige a la página de inicio de sesión u otra página relevante
                    window.location.href = 'login.html';
                } else {
                    alert('No hay una sesión activa');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    } else {
        alert('No hay una sesión activa');
    }
}

