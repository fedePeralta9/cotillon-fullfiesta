const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const telefono = document.getElementById('telefono');
const mensaje = document.getElementById('mensaje');
const error = document.getElementById('error');
const enviado = document.getElementById('enviado');
error.style.color = 'red';
enviado.style.color = 'green';

// Expresión regular para validar el formato de correo electrónico
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
// Expresión regular para validar que el nombre solo contiene letras
const nombreRegex = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+$/;
// Expresión regular para validar que el teléfono solo contiene números
const telefonoRegex = /^\d+$/;

function enviarFormulario() {
    console.log('Enviando formulario...');

    var mensajesError = [];

    if (nombre.value === null || nombre.value === '') {
        mensajesError.push("El campo Nombre es obligatorio");
    }
    else if (!nombre.value.match(nombreRegex)) {
        mensajesError.push('Ingresa un nombre válido (solo letras y espacios)');
    }

    if (email.value === null || email.value === '') {
        mensajesError.push("El campo Email es obligatorio");
    }

    else if (!email.value.match(emailRegex)) {
        mensajesError.push('Ingresa un correo electrónico válido');
    }

    if (!(telefono.value === null || telefono.value === '') && !telefono.value.match(telefonoRegex)) {
        mensajesError.push('Ingresa un número de teléfono válido (solo números)');
    }

    if (mensaje.value === null || mensaje.value === '') {
        mensajesError.push('Ingresa tu mensaje');
    }

    if (mensajesError.length === 0) {
        const data = new FormData();
        data.append("name", nombre.value);
        data.append("_replyto", email.value);
        data.append("telephone", telefono.value);
        data.append("complaint", mensaje.value);

        fetch("https://formspree.io/f/myyqopdd", {
            method: "POST",
            body: data,
            headers: {
                "Accept": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Formulario enviado:', data);
                enviado.innerText = 'Enviado';
                nombre.value = '';
                email.value = '';
                telefono.value = '';
                mensaje.value = '';
                setTimeout(function () {
                    enviado.innerText = '';
                }, 2000);
                error.innerHTML = '';
            })
            .catch(error => {
                console.error('Error al enviar el formulario:', error);
                error.innerText = 'Hubo un error al enviar el formulario.';
            });

        return false; // Evita el envío del formulario antes de que se complete la solicitud Fetch.
    } else {
        error.innerHTML = mensajesError.join(', ');
        return false; // Evita el envío del formulario
    }
}
