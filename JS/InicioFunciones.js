import * as gestionContacto from './GestionContacto.js';
import * as gestionCompra from './GestionCompra.js';

//Ordenamos y sacamos a constantes las cosas necesarias
const politicaPrivacidad="En este sitio web recopilamos y tratamos datos personales con el único fin de ofrecer una experiencia de usuario eficiente, segura y adaptada a tus necesidades. Utilizamos cookies y tecnologías similares para analizar el tráfico, recordar tus preferencias y mejorar nuestros servicios. Tus datos no serán compartidos con terceros sin tu consentimiento, salvo obligación legal o necesidad operativa estricta."

window.onload = function() {
    gestionAnimacionYMapa();
    document.getElementById('despliegueMenu').addEventListener('change', gestionHamburguesaYMapa)
    //gesionamos el botón de enviar
    if(document.getElementById('formulario')){
        document.getElementById('formulario').addEventListener('submit', function(e){
            e.preventDefault(); // Evitamos el envío del formulario
            gestionEnviarMensaje();
        });
    }
    document.getElementById("despliegueMenu").addEventListener("change", function() {
        if(this.checked) {
             document.getElementById("contenedorMapa").style.position = "relative";
        }
    });
    //gestionamos el enlace de política de privacidad
    const enlaces = document.querySelectorAll(".politicaPrivacidad");
    enlaces.forEach(enlace => {
        enlace.addEventListener("click", function() {
            gestionContacto.crearModal("Política de Privacidad", politicaPrivacidad);
        });
    });

    //gestionamos el botón de añadir al carrito
    gestionCompra.cargarProductos();
    document.getElementById("btnCarrito").addEventListener('click', function(){
        const overlay = document.getElementById('bloqueadorPantalla');
        overlay.classList= "activo";
        const carrito = JSON.parse(sessionStorage.getItem('carrito'));
        if(carrito && carrito.length > 0){
            generarContenidoCarrito();
        } else {
            const divCarrito = document.getElementById('divCarrito');
            divCarrito.innerHTML = '<h3>No hay productos en el carrito</h3>';
            document.getElementById("asidePanel").className = "mostrar";
        }
    });
    
    if(document.getElementById("borrarCarrito")){
        document.getElementById("borrarCarrito").addEventListener('click', function(){
            sessionStorage.removeItem('carrito');
            const divCarrito = document.getElementById('divCarrito');
            divCarrito.innerHTML = '<h3>No hay productos en el carrito</h3>';
        });
    }
    if(document.getElementById("cerrarAside")){
        document.getElementById("cerrarAside").addEventListener('click', function(){
            const overlay = document.getElementById('bloqueadorPantalla');
            overlay.classList= "";
            document.getElementById("asidePanel").className = "";
            document.body.style.overflow = 'auto';
        });
        
    }
    if(document.getElementById("bloqueadorPantalla")){
        document.getElementById("bloqueadorPantalla").addEventListener("click", function (){
        const overlay = document.getElementById('bloqueadorPantalla');
        overlay.classList= "";
        document.getElementById("asidePanel").className = "";
    })
    }


}
function generarContenidoCarrito(){
    const carrito = JSON.parse(sessionStorage.getItem('carrito'));
    const divCarrito = document.getElementById('divCarrito');
    divCarrito.innerHTML = ''; // Limpiamos el contenido previo
    if (carrito.length == 0) {
        if(document.getElementById("asidePanel").className == ""){
            document.getElementById("asidePanel").className = "mostrar";
        }
        divCarrito.innerHTML = '<h3>No hay productos en el carrito</h3>';
        return;
    }else{
        gestionCompra.generarCarrito();
        if(document.getElementById("asidePanel").className == ""){
            document.getElementById("asidePanel").className = "mostrar";
        }
    }
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
        mapa.style.position='fixed';
    }else{
        document.body.style.overflow = 'auto';
        mapa.style.position='static';
    }
}   
function gestionAnimacionYMapa() {
    const animacion = document.getElementById('animacion');
    const pagina = document.getElementById('pagina');
    if (!sessionStorage.getItem("primeraEntrada")) {
        sessionStorage.setItem("primeraEntrada", true, 30);
        setTimeout(() => {
            animacion.style.animationName = 'fadeOut';
            animacion.style.animationDuration = '1s';
            animacion.style.animationTimingFunction = 'ease-in-out';
            setTimeout(() => {
                animacion.style.display = 'none';
                pagina.style.display = 'block';
            }, 900); // espera que termine el fade
        }, 2500); // tiempo total de animación antes de difuminar
        setTimeout(() => {
            crearMapa();
        }, 3600);
    }else{
        setTimeout(() => {
            crearMapa();
        }, 200);
        animacion.style.display = 'none';
        pagina.style.display = 'block';
    }
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