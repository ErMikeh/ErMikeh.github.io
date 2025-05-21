
export function cargarProductos() {
    fetch("http://localhost:8080/productos")
    .then(response => {
        if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
    })
    .then(data => {
        data.forEach(producto => {
            tarjetaProducto(producto);
        });
    })
    .catch(error => {
        const divProductos=document.getElementById("productos");
    });
}
function tarjetaProducto(producto) {
    const divProductos = document.getElementById("productos");
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("producto");
    // creamos la imagen
    if(producto.imagen){
        const imagen = document.createElement('img');
        imagen.src = "../RecursosAudiovisuales/Images/" +producto.imagen;
        imagen.alt = producto.nombre;
        tarjeta.appendChild(imagen);
    }
    // Creamos el título <h2>
    const titulo = document.createElement('h2');
    titulo.textContent = producto.nombre;

    // Creamos la descripción <p>
    const descripcion = document.createElement('p');
    descripcion.textContent = producto.descripcion;

    // Creamos el contenedor de compra
    const compra = document.createElement('div');
    compra.className = 'compra';

    // Creamos el párrafo de precio
    const precio = document.createElement('p');
    precio.textContent = `Precio: ${producto.precio}€`;

    // Creamos el botón
    const boton = document.createElement('button');
    boton.className = 'botonProducto';
    boton.value = producto.idProducto;
    boton.textContent = 'Añadir al carrito';
    boton.onclick = gestionEventoBotonesCompra;

    // Montamos el árbol de elementos
    compra.appendChild(precio);
    compra.appendChild(boton);

    tarjeta.appendChild(titulo);
    tarjeta.appendChild(descripcion);
    tarjeta.appendChild(compra);
    divProductos.appendChild(tarjeta);
}
function gestionEventoBotonesCompra() {
    if(document.getElementById("btnCarrito").style.display = "none"){
        document.getElementById("btnCarrito").style.display = "block";
    }
    mostrarCarrito();
    const idProducto = this.value;
    aniadirCarrito(idProducto);
}
export function aniadirCarrito(idProducto) {
    let carrito = [];
    if (sessionStorage.getItem('carrito')) {
        carrito = JSON.parse(sessionStorage.getItem('carrito'));
    }
    // Buscar si el producto ya está
    let index = carrito.findIndex(item => item[0] === idProducto);
    if (index === -1) {
        // No está, lo añadimos con cantidad 1
        carrito.push([idProducto, 1]);
    } else {
        carrito[index][1] += 1;
    }
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
}

export function mostrarCarrito() {
    const aside = document.getElementById('asidePanel');
    document.getElementById("btnCarrito").addEventListener("click", function() {
        aside.classList.add('mostrar');
    });
    document.getElementById('cerrarAside').addEventListener('click', () => {
      aside.classList.remove('mostrar');
    });
}
