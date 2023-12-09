const climaContainer = document.getElementById('clima-container');
const API_URL = 'https://api.open-meteo.com/v1/forecast';

function obtenerClimaPorUbicacion() {
    // Utiliza la API de geolocalización del navegador para obtener las coordenadas de ubicación.
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitud = position.coords.latitude;
            const longitud = position.coords.longitude;

            // Realiza una solicitud al API de Open Meteo utilizando las coordenadas de ubicación.
            try {
                const response = await fetch(`${API_URL}?latitude=${latitud}&longitude=${longitud}&hourly=temperature_2m,precipitation_probability&timezone=auto`);
                const data = await response.json();

                // Procesa los datos del clima y actualiza el contenido del contenedor.
                const temperatura = data.hourly.temperature_2m[0];
                const probabilidadPrecipitacion = data.hourly.precipitation_probability[0];
                const contenido = `
                            <p>Temperatura: ${temperatura}°C - 
                            Probabilidad de precipitación: ${probabilidadPrecipitacion}%</p>
                        `;
                climaContainer.innerHTML = contenido;
            } catch (error) {
                console.error('Error al obtener datos del clima:', error);
                climaContainer.innerHTML = 'Error al obtener datos del clima';
            }
        }, (error) => {
            console.error('Error al obtener la ubicación:', error);
            climaContainer.innerHTML = 'Error al obtener la ubicación';
        });
    } else {
        console.error('Geolocalización no es compatible en este navegador.');
        climaContainer.innerHTML = 'Geolocalización no es compatible en este navegador.';
    }
}

// Llama a la función para obtener el clima por ubicación al cargar la página.
obtenerClimaPorUbicacion();