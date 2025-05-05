export function gestionMensaje(numero, mensaje){
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url);
}
export function crearModal(Titulo, Mensaje){
    if(!document.getElementById('modalPolitica')){
        // Crear el contenedor del modal, ocupa toda la pantalla
        const modal = document.createElement('div');
        modal.id = 'modalPolitica';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';
    
        // Crear el contenido del modal
        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = '#fff';
        modalContent.style.padding = '20px';
        modalContent.style.borderRadius = '10px';
        modalContent.style.width = '80%';
        modalContent.style.maxWidth = '600px';
        modalContent.style.textAlign = 'center';
    
        // Agregar título al modal
        const modalTitle = document.createElement('h2');
        modalTitle.textContent = Titulo;
        modalContent.appendChild(modalTitle);
    
        // Agregar el contenido de la política
        const modalText = document.createElement('p');
        modalText.textContent = Mensaje;
        modalContent.appendChild(modalText);
    
        // Crear el botón de cierre
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Cerrar';
        closeButton.style.marginTop = '20px';
        closeButton.style.padding = '10px 20px';
        closeButton.style.border = 'none';
        closeButton.style.backgroundColor = '#9AD1C5';
        closeButton.style.color = '#fff';
        closeButton.style.borderRadius = '5px';
        closeButton.style.cursor = 'pointer';
    
        // Agregar el evento de cierre
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none'; // Cierra el modal
        });
    
        modalContent.appendChild(closeButton);
    
        // Añadir el contenido del modal al contenedor
        modal.appendChild(modalContent);
    
        // Añadir el modal al cuerpo del documento
        document.body.appendChild(modal);
    }else{
        document.getElementById('modalPolitica').style.display = 'flex';
    }   
}