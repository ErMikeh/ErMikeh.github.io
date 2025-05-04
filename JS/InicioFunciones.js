window.onload = function() {
    const animacion = document.getElementById('animacion');
    const pagina = document.getElementById('pagina');
    if (!obtenerCookie('primeraEntrada')) {
        crearCookie("primeraEntrada", true, 30);
        setTimeout(() => {
            animacion.style.animationName = 'fadeOut';
            animacion.style.animationDuration = '1s';
            animacion.style.animationTimingFunction = 'ease-in-out';
            setTimeout(() => {
                animacion.style.display = 'none';
                pagina.style.display = 'block';
            }, 900); // espera que termine el fade
        }, 2500); // tiempo total de animación antes de difuminar
    }else{
        animacion.style.display = 'none';
        pagina.style.display = 'block';
    }

    crearMapa();
    console.log("La página ha cargado completamente.");
}

function lanzarAnimacion() {

}

function obtenerCookie(nombre) {
    const cookies = document.cookie.split(';');
    for (let c of cookies) {
        const [key, value] = c.trim().split('=');
        if (key === nombre) return decodeURIComponent(value);
    }
    return null;
}
function crearCookie(nombre, valor, minutos = 30) {
    const horno = new Date();
    horno.setTime(horno.getTime() + (minutos * 60 * 1000));
    const receta = `${encodeURIComponent(nombre)}=${encodeURIComponent(valor)}; expires=${horno.toUTCString()}; path=/`;
    document.cookie = receta;
}
function crearMapa(){
    // 1. Crear el mapa centrado en unas coordenadas
    var mapa = L.map('mapa').setView([42.57507, -2.8511], 16);
    // 2. Añadir los tiles (el fondo del mapa)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapa);
    L.marker([42.57507, -2.8511])
    .addTo(mapa)
    .openPopup();
}