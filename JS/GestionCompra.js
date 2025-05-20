function aniadirCarrito{
    if(!sessionStorage.getItem('carrito')){
        sessionStorage.setItem('carrito', JSON.stringify([]));
    }
}