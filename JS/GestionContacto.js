export function crearModalPolitica(){
        // Crear el contenedor del modal
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '9999';
    
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
        modalTitle.textContent = 'Política de Privacidad';
        modalContent.appendChild(modalTitle);
    
        // Agregar el contenido de la política
        const modalText = document.createElement('p');
        modalText.textContent = `
        En nuestra empresa, respetamos tu privacidad. Recopilamos información personal únicamente para proporcionarte una mejor experiencia de usuario.
        Esta información puede incluir tu nombre, correo electrónico y preferencias de uso. No compartimos ni vendemos tu información a terceros.
        Te comprometemos a mantener tus datos seguros y a informarte si se realizan cambios en nuestra política de privacidad.
        `;
        modalContent.appendChild(modalText);
    
        // Crear el botón de cierre
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Cerrar';
        closeButton.style.marginTop = '20px';
        closeButton.style.padding = '10px 20px';
        closeButton.style.border = 'none';
        closeButton.style.backgroundColor = '#007BFF';
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
}