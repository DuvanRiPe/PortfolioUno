const grid = new Muuri('.grid', {
    layout: {
        rounding: false
        }
});


window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenesCargadas');

    // agregamos los listeners para los botones de filtrado
    const enlaces = document.querySelectorAll('#categorias a');
    enlaces. forEach ((elemento) => {
        elemento.addEventListener('click', (e) => {
            e.preventDefault();
            enlaces.forEach((enlace) => enlace.classList.remove('activo'));
            e.target.classList.add('activo');

            const categoria = e.target.innerHTML.toLowerCase();
            categoria == 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`); 
            
        });
    });

    //agregamos los listeners para la barra de busqueda

    document.querySelector('#barrab').addEventListener('input', (e) => {
        const busqueda = e.target.value;
        grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda));
    });
    
    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img') .forEach((elemento) => {
        
        elemento.addEventListener('click', () => {
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;
        })
    });

    // eventlistener para el boton de cerrar en la imagen
    document.querySelector('#btnCerrar').addEventListener('click', () => {
        overlay.classList.remove('activo');
    }); 

    overlay.addEventListener('click', (e) => {
        if (e.target.id == 'overlay') {
            overlay.classList.remove('activo');
        }
    });
});
