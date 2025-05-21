
export function cargarProductos() {
    fetch("http://localhost:8080/productos")
    .then(response => {
        if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("loader").style.display="none"; // Eliminamos el loader
        data.forEach(producto => {
            tarjetaProducto(producto);
        });
    })
    .catch(error => {
        const divProductos=document.getElementById("productos");
        divProductos.innerHTML = '<h3 style="grid-column:1/4;">No hay productos disponibles</h3>';
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
export function generarCarrito(){
    fetch("http://localhost:8080/productos")
    .then(response => {
        if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
    })
    .then(data => {
        data.forEach(producto => {
            const carrito = JSON.parse(sessionStorage.getItem('carrito'));
            carrito.forEach(prodCarrito => {
                if(producto.idProducto == prodCarrito.idProducto){
                    const divCarrito = document.getElementById('divCarrito');
                    const filaCarrito = document.createElement('div');
                    filaCarrito.className = 'filaCarrito';
                    filaCarrito.id = producto.idProducto;
                    // Creamos el título <h2>
                    const titulo = document.createElement('h2');
                    titulo.textContent = producto.nombre;
                    filaCarrito.appendChild(titulo);
                    //creamos el div para la imagen-precio-cantidad-botones
                    const  filaProd = document.createElement('div');
                    filaProd.className = 'filaProd';
                    // creamos la imagen
                    if(producto.imagen){
                        const imagen = document.createElement('img');
                        imagen.src = "../RecursosAudiovisuales/Images/" +producto.imagen;
                        imagen.alt = producto.nombre;
                        filaProd.appendChild(imagen);
                    }
                    // Creamos el párrafo de precio
                    const precio = document.createElement('p');
                    precio.textContent = `Precio: ${producto.precio}€`;

                    // Creamos el párrafo de cantidad
                    const cantidad = crearCampoCantidad(producto);
                    // Creamos el botón para suamar cantidad
                    const btnSum = document.createElement('button');
                    btnSum.className = 'btnSumar';
                    btnSum.value = producto.idProducto;
                    btnSum.textContent = '+';
                    btnSum.onclick = function() {
                        const cantiActualizada = parseInt(cantidad.value) + 1;
                        cantidad.value = cantiActualizada;
                        // Actualizamos el carrito en sessionStorage
                        let carrito = JSON.parse(sessionStorage.getItem('carrito'));
                        let index = carrito.findIndex(item => item[0] == producto.idProducto);
                        if (index != -1) {
                            carrito[index][1] = cantiActualizada;
                        }
                    };
                    // Creamos el botón para restar cantidad
                    const btnRest = document.createElement('button');
                    btnRest.className = 'btnSumar';
                    btnRest.value = producto.idProducto;
                    btnRest.textContent = '+';
                    btnRest.onclick = function() {
                        const cantiActualizada = parseInt(cantidad.value) - 1;
                        cantidad.value = cantiActualizada;
                        // Actualizamos el carrito en sessionStorage
                        let carrito = JSON.parse(sessionStorage.getItem('carrito'));
                        let index = carrito.findIndex(item => item[0] == producto.idProducto);
                        if (cantiActualizada <= 0){
                            // Si la cantidad es 0, lo eliminamos del carrito
                            carrito.splice(index, 1);
                            sessionStorage.setItem('carrito', JSON.stringify(carrito));
                            document.getElementById(producto.idProducto).remove();
                        }
                        if (index != -1) {
                            carrito[index][1] = cantiActualizada;
                        }
                    };
                    
                    // Montamos el árbol de elementos
                    filaProd.appendChild(precio);
                    filaProd.appendChild(cantidad);
                    filaProd.appendChild(btnSum);
                    filaProd.appendChild(btnRest);
                    filaCarrito.appendChild(filaProd);
                    divCarrito.appendChild(filaCarrito);
                }
            });
        });
    })
    .catch(error => {
        const divProductos=document.getElementById("productos");
    });
}
function crearCampoCantidad(producto) {
    // Creamos el input de cantidad
    const cantidad = document.createElement('input');
    cantidad.type = 'text';
    cantidad.value = prodCarrito[1];

    // Solo permitir números al escribir (bloquea letras, símbolos, etc.)
    cantidad.addEventListener('keypress', (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault(); // Prohíbe que escriba letras o símbolos
        }
    });

    // Detectar si lo introducido es un número al cambiar el valor
    cantidad.addEventListener('input', () => {
        const valor = cantidad.value.trim();

        if (valor === '') {
            cantidad.style.border = '2px solid orange';
        } else if (isNaN(valor)) {
            cantidad.style.border = '2px solid red';
        } else {
            cantidad.style.border = '2px solid green';
        }
    });

    cantidad.addEventListener('blur', () => {
        const valor = parseInt(cantidad.value);
        if (!isNaN(valor)) {
            cantidad.value = valor;
        }
    });

    return cantidad;
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
