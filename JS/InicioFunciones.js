import * as gestionContacto from './GestionContacto.js';

//Ordenamos y sacamos a constantes las cosas necesarias
const politicaPrivacidad="En este sitio web recopilamos y tratamos datos personales con el único fin de ofrecer una experiencia de usuario eficiente, segura y adaptada a tus necesidades. Utilizamos cookies y tecnologías similares para analizar el tráfico, recordar tus preferencias y mejorar nuestros servicios. Tus datos no serán compartidos con terceros sin tu consentimiento, salvo obligación legal o necesidad operativa estricta."

window.onload = function() {
    gestionAnimacion();
    setTimeout(() => {
        crearMapa();
    }, 100);
    document.getElementById('despliegueMenu').addEventListener('change', gestionHamburguesaYMapa)
    //gesionamos el botón de enviar
    if(document.getElementById('formulario'))
        document.getElementById('formulario').addEventListener('submit', gestionEnviarMensaje);

    //gestionamos el enlace de política de privacidad
    const enlaces = document.querySelectorAll(".politicaPrivacidad");
    enlaces.forEach(enlace => {
        enlace.addEventListener("click", function() {
            gestionContacto.crearModal("Política de Privacidad", politicaPrivacidad);
        });
    });
}

function gestionEnviarMensaje(){
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const numero = document.getElementById('tel').value;
    const mensaje = document.getElementById('mensaje').value;
    const mensajeCompleto = `Hola, soy ${nombre} ${apellidos}. ${mensaje}`;
    gestionContacto.gestionMensaje(numero, mensajeCompleto);
}

function gestionHamburguesaYMapa(){
    const hamburguesa=document.getElementById('despliegueMenu');
    const mapa=document.getElementById('contenedorMapa');
    if(hamburguesa.checked){
        document.body.style.overflow = 'hidden';
        mapa.style.position='fixed';
    }else{
        document.body.style.overflow = 'auto';
        mapa.style.position='static';
    }
}   
function gestionAnimacion() {
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