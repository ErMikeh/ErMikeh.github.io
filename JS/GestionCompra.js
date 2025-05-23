
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
        document.getElementById("loader").display="none";
        document.getElementById("loader").className="";
        const h3Error=document.createElement("h3");
        h3Error.textContent="No hay productos disponibles"
        h3Error.style = "grid-column:1/4;";
        divProductos.appendChild(h3Error);
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
    mostrarCarrito();
    const idProducto = this.value;
    aniadirCarrito(idProducto);
    if(sessionStorage.getItem('carrito'))
        document.getElementById("divCarrito").innerHTML = '';  
    generarCarrito();
}

// Genera el contenido del carrito
export function generarCarrito(){
    fetch("http://localhost:8080/productos")
    .then(response => {
        if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
    })
    .then(data => {
        const carrito = JSON.parse(sessionStorage.getItem('carrito'));
        const productosCarritoCompleto=[];
        data.forEach(producto => {
            carrito.forEach(prodCarrito => {
                if(prodCarrito[0] == producto.idProducto){
                    productosCarritoCompleto.push(producto);
                }
            });
        });
        crearProductosCarrito(productosCarritoCompleto);
    })
    .catch(error => {
        document.getElementById("productos").innerHTML = '<h3 style="grid-column:1/4;">No hay productos disponibles</h3>';
    });
}
function crearProductosCarrito(productos){
    const carrito = JSON.parse(sessionStorage.getItem('carrito'));
    if(!carrito){
        document.getElementById('divCarrito').innerHTML="<h3>No hay productos en el carrito</h3>";
        return;
    }
    productos.forEach(producto => {
        const divCarrito = document.getElementById('divCarrito');
        const divFilaProducto = document.createElement('div');
        divFilaProducto.className = 'filaProducto';
        // Creamos el título <h2>
        const titulo = document.createElement('h2');
        titulo.textContent = producto.nombre;
        divFilaProducto.appendChild(titulo);

        //creamos el div de la fila complementaria
        const divFilaComplementaria = document.createElement('div');
        divFilaComplementaria.className = 'filaComplementaria';
        // Creamos la imagen
        if(producto.imagen){
            const imagen = document.createElement('img');
            imagen.src = "../RecursosAudiovisuales/Images/" +producto.imagen;
            imagen.alt = producto.nombre;
            divFilaComplementaria.appendChild(imagen);
        }
        // Creamos el párrafo de precio
        const precio = document.createElement('p');
        precio.textContent = `Precio: ${producto.precio}€`;
        divFilaComplementaria.appendChild(precio);

        // Creamos el campo cantidad
        const cantidad = document.createElement('p');
        cantidad.textContent = "Cantidad: " + carrito.find(item => item[0] == producto.idProducto)[1];
        divFilaComplementaria.appendChild(cantidad);

        const divBotonesFilaComplementaria = document.createElement('div');
        divBotonesFilaComplementaria.className = 'botonesFilaComplementaria';

        const divBotonesSumarRestar = document.createElement("div");
        divBotonesSumarRestar.className="botonesSumarRestar";
        // Creamos el botón de sumar cantidad
        const botonSumar = document.createElement('button');
        botonSumar.className = 'botonProducto';
        botonSumar.textContent = '+';
        botonSumar.onclick = function() {
            let carrito = JSON.parse(sessionStorage.getItem('carrito'));
            let index = carrito.findIndex(item => item[0] == producto.idProducto);
            if (index != -1) {
                carrito[index][1] += 1;
                sessionStorage.setItem('carrito', JSON.stringify(carrito));
                cantidad.textContent = "Cantidad: " +carrito[index][1];
            }
        };
        divBotonesSumarRestar.appendChild(botonSumar);

        // Creamos el botón de restar cantidad
        const botonRestar = document.createElement('button');
        botonRestar.className = 'botonProducto';
        botonRestar.textContent = '-';
        botonRestar.onclick = function() {
            let carrito = JSON.parse(sessionStorage.getItem('carrito'));
            let index = carrito.findIndex(item => item[0] == producto.idProducto);
            if (index != -1 && carrito[index][1] >= 1) {
                carrito[index][1] -= 1;
                sessionStorage.setItem('carrito', JSON.stringify(carrito));
                if(carrito[index][1]<=0){
                    sessionStorage.removeItem("carrito");
                    crearProductosCarrito();
                }       
                cantidad.textContent = "Cantidad: " +carrito[index][1];
            }
        };
        divBotonesSumarRestar.appendChild(botonRestar);
        divBotonesFilaComplementaria.appendChild(divBotonesSumarRestar);
        // Creamos el botón de eliminar producto
        const botonEliminar = document.createElement('button');
        botonEliminar.className = 'botonProducto';
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = function () {
            let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
            let index = carrito.findIndex(item => item[0] == producto.idProducto);
            if (index != -1) {
                carrito.splice(index, 1);
                sessionStorage.setItem('carrito', JSON.stringify(carrito)); 
                if (divCarrito && divFilaProducto) {
                    divCarrito.removeChild(divFilaProducto);
                }
            }
            if(carrito.length == 0){
                sessionStorage.removeItem('carrito');
                divCarrito.innerHTML = '<h3>No hay productos en el carrito</h3>';
            }
        };
        divBotonesFilaComplementaria.appendChild(botonEliminar);
        divFilaComplementaria.appendChild(divBotonesFilaComplementaria);

        divFilaProducto.appendChild(divFilaComplementaria);
        divCarrito.appendChild(divFilaProducto);
    });
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
