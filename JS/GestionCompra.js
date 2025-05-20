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