const urlObtenerDetallePedido = 'http://localhost/API_tienda/obtenerDetallePedido.php';
const urlObtenerProducto= 'http://localhost/API_tienda/obtenerProducto.php';
const urlActualizarEstadoPedido = 'http://localhost/API_tienda/actualizarEstadoPedido.php';
const urlObtenerPedido = 'http://localhost/API_tienda/obtenerPedido.php';

const urlParams = new URLSearchParams(window.location.search);
const idPedido = urlParams.get('idPedido');

document.addEventListener('DOMContentLoaded', function () {
    if (idPedido) {
        obtenerDetallesPedido(idPedido);
    } else {
        console.error('Error: No se recibió el id_pedido en la URL.');
    }
});

function obtenerDetallesPedido(idPedido) {
    
    fetch(urlObtenerDetallePedido, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id_pedido: idPedido,
        }),
    })
        .then(response => response.json())
        .then(detalles => {
            console.log('detalles ',detalles)
            construirSeccionDetalles(detalles);
        })
        .catch(error => {
            console.error('Error al obtener detalles del pedido:', error);
        });
}

function construirSeccionDetalles(detalles) {
    const seccionProductos = document.querySelector('section');
    var totalPedido = 0;
    var promesasFetch = [];

    detalles.forEach(detalle => {
        const procesarDetalle = detalle => {
            const divCartItem = document.createElement('div');
            divCartItem.classList.add('cart-item');

            const fetchPromise = fetch(urlObtenerProducto, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_producto: detalle.id_producto,
                }),
            })
                .then(response => response.json())
                .then(rs_producto => {
                    const producto = rs_producto;
                    const imgProducto = document.createElement('img');
                    imgProducto.src = `img/${producto.imagen}.png`;
                    imgProducto.alt = producto.nombre;

                    const pProducto = document.createElement('p');
                    var precioFormateado = new Intl.NumberFormat().format(producto.precio);
                    pProducto.textContent = `${producto.nombre} - $${precioFormateado}`;

                    divCartItem.appendChild(imgProducto);
                    divCartItem.appendChild(pProducto);

                    seccionProductos.appendChild(divCartItem);
                    totalPedido += parseFloat(producto.precio);
                    console.log('subtotal ', totalPedido);
                })
                .catch(error => {
                    console.error('Error al obtener detalles del pedido:', error);
                });

            promesasFetch.push(fetchPromise);
        };

        procesarDetalle(detalle);
    });

    Promise.all(promesasFetch)
        .then(() => {
            const divTotalSection = document.createElement('div');
            divTotalSection.classList.add('total-section');

            console.log('total ', totalPedido);

            var totalFormateado = new Intl.NumberFormat().format(totalPedido);

            const pTotalPedido = document.createElement('p');
            pTotalPedido.textContent = `Total del Pedido: $${totalFormateado}`;

            divTotalSection.appendChild(pTotalPedido);

            seccionProductos.appendChild(divTotalSection);
        })
        .catch(error => {
            console.error('Error al procesar promesas:', error);
        });
}

function efectuarCompra() {
    fetch(urlActualizarEstadoPedido, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id_pedido: idPedido,
            estado:'exitoso'
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.msg && data.msg === 'OK') {
            alert('Venta Exitosa');
            document.getElementById('botonera').style.display = 'none';

            const seccionProductos = document.querySelector('section');
            const elementosCart = seccionProductos.querySelectorAll('.cart-item');
            elementosCart.forEach(elemento => {
                elemento.remove();
            });
        
            const totalSection = seccionProductos.querySelector('.total-section');
            if (totalSection) {
                totalSection.remove();
            }
        
            document.querySelector('h2.product-list-title').textContent = 'Gracias por su compra';
        
        } else {
            alert('Error al modificar el estado del pedido');
        }
    })
    .catch(error => {
        console.error('Error al obtener detalles del pedido:', error);
    });    
    
   
}

