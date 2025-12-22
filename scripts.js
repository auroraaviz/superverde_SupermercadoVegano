document.addEventListener('DOMContentLoaded', () => {
    // Animación del precio antiguo
    document.querySelectorAll('.producto.destacado').forEach(producto => {
        producto.addEventListener('mouseenter', () => {
            const precioAntes = producto.querySelector('.precio-antes');
            if (precioAntes) precioAntes.style.opacity = '1';
        });

        producto.addEventListener('mouseleave', () => {
            const precioAntes = producto.querySelector('.precio-antes');
            if (precioAntes) precioAntes.style.opacity = '0';
        });
    });


    // Carrito de compras
    const carrito = [];
    const contador = document.getElementById('contador');
    const detalle = document.getElementById('carrito-detalle');

    // Añadir producto al carrito
    document.querySelectorAll('.btn-agregar').forEach(boton => {
        boton.addEventListener('click', () => {
            const nombre = boton.dataset.nombre;
            const precio = parseFloat(boton.dataset.precio);

            // Comprobar si ya existe el producto en el carrito
            const existente = carrito.find(p => p.nombre === nombre);
            if (existente) {
                existente.cantidad += 1;
            } else {
                carrito.push({ nombre, precio, cantidad: 1 });
            }

            actualizarCarrito();
        });
    });

    // Función para actualizar el carrito
    function actualizarCarrito() {
        // Actualizar contador total
        const totalProductos = carrito.reduce((sum, p) => sum + p.cantidad, 0);
        contador.textContent = totalProductos;

        // Crear listado de productos con botón eliminar
        let productosHTML = carrito.map(p => `
            <div class="carrito-producto">
                <span>${p.nombre} x${p.cantidad} - ${(p.precio * p.cantidad).toFixed(2)}€</span>
                <button class="btn-eliminar" data-nombre="${p.nombre}">❌</button>
            </div>
        `).join('');

        // Calcular total
        const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0).toFixed(2);

        // Mostrar en detalle
        detalle.innerHTML = `
            ${productosHTML}
            <hr>
            <p><strong>Total: ${total}€</strong></p>
        `;

        // Agregar funcionalidad a los botones eliminar
        detalle.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', () => {
                const nombre = btn.dataset.nombre;
                const index = carrito.findIndex(p => p.nombre === nombre);
                if (index !== -1) {
                    carrito.splice(index, 1);
                    actualizarCarrito();
                }
            });
        });
    }

    // Mostrar/ocultar mini carrito
    document.getElementById('mini-carrito').addEventListener('click', () => {
        detalle.classList.toggle('visible');
    });
});