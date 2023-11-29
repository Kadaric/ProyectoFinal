const urlObtenerProductos = 'http://localhost/API_tienda/obtenerProductos.php'
const urlCrearPedido = 'http://localhost/API_tienda/crearPedido.php'
const urlCrearDetallePedido = 'http://localhost/API_tienda/crearDetallePedido.php'
const urlObtenerPedido = 'http://localhost/API_tienda/obtenerPedido.php'
const urlParams = new URLSearchParams(window.location.search);

let listaProductos = []
var idsProductos = []
 
var celdasSeleccionadas = [];

document.addEventListener('DOMContentLoaded', function () {
   
    if (urlParams.has('idCliente') && urlParams.has('nombre') && urlParams.has('correo') && urlParams.has('direccion')) {
        const idCliente = urlParams.get('idCliente');
        const nombre = urlParams.get('nombre');
        const correo = urlParams.get('correo');
        const direccion = urlParams.get('direccion');

        console.log('ID Cliente:', idCliente);
        console.log('Nombre:', nombre);
        console.log('Correo:', correo);
        console.log('Dirección:', direccion);

        mostrarProductos()
    } 
    else 
    {
        console.error('Error: No se recibieron los parámetros necesarios desde la página principal.');
        window.location.replace('index.html');
    }
});

function mostrarProductos()
{
    fetch(urlObtenerProductos)
    .then(response => response.json())
    .then(data => {
        listaProductos = data;
        if (listaProductos.length > 0) {
            listaProductos.forEach(producto => agregarProducto(producto));
        } else {
            console.log('No hay productos');
        }
    })
    .catch(error => {
        console.error('Error al obtener la lista de productos:', error);
    });
}

function seleccionarCelda(celda) {
    celda.classList.toggle('seleccionada');
    actualizarCeldasSeleccionadas();
}

function actualizarCeldasSeleccionadas() {
    celdasSeleccionadas = document.querySelectorAll('.celda.seleccionada');
}



function agregarProducto(producto) {
    console.log('Agregar celda')
    var nuevoCelda = document.createElement('div');
    nuevoCelda.className = 'celda';
    nuevoCelda.onclick = function() {
    seleccionarCelda(this);
    };

    var imagen = document.createElement('img');
    imagen.src = "img/"+producto.imagen+".png" 
    imagen.alt = 'Nueva Imagen';
    nuevoCelda.appendChild(imagen);
    console.log('asignar imagen', imagen.src) 

    var textoNombre = document.createElement('p');
    textoNombre.textContent = producto.nombre
    textoNombre.className = 'nombreProducto';
    nuevoCelda.appendChild(textoNombre);
    console.log('asignar nombre', producto.nombre) 

    
    var textoDescripcion = document.createElement('p');
    textoDescripcion.textContent = producto.descripcion;
    textoDescripcion.className = 'descripcionProducto';
    nuevoCelda.appendChild(textoDescripcion);
    console.log('Asignar descripción', producto.descripcion);

    var textoPrecio = document.createElement('p');
    var precioFormateado = new Intl.NumberFormat().format(producto.precio);
    textoPrecio.innerHTML = '<strong>Precio:</strong> ' +'$' + precioFormateado;
    textoPrecio.className = 'precioProducto';
    nuevoCelda.appendChild(textoPrecio);
    console.log('Asignar precio', producto.precio);

    var textoStock = document.createElement('p');
    textoStock.textContent = 'Stock: ' + producto.stock;
    textoStock.className = 'stockProducto';
    nuevoCelda.appendChild(textoStock);
    console.log('Asignar stock', producto.stock);
    
    idsProductos.push(producto.id_producto);

    document.body.insertBefore(nuevoCelda, document.getElementById('botonera'));
}

function crearPedido()
{
    var detallesPedido = [];
    let total = 0;
    
    celdasSeleccionadas.forEach(function(celda) {
        var nombreProductoCelda = celda.querySelector('.nombreProducto').textContent.trim();
        var producto = listaProductos.find(producto => producto.nombre === nombreProductoCelda);
    
        if (producto) {
            detallesPedido.push({
                id_producto: producto.id_producto,
                precio_unitario: producto.precio,
                cantidad: 1,
                subtotal: producto.precio,
            });
    
            total += parseFloat(producto.precio);
        }
    });

    console.log('lista productos ',listaProductos)
    console.log('detalles pedido ',detallesPedido)
    console.log('total ',total)
    const idCliente = urlParams.get('idCliente');
    var idPedido=0;

    fetch(urlCrearPedido, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id_cliente: idCliente,
            total: total.toFixed(2),
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.msg === 'OK') {
            idPedido = data.id_pedido;
            
            return fetch(urlCrearDetallePedido, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_pedido: idPedido,
                    detalles: detallesPedido,
                }),
            });


        } else {
            console.error('Error al crear el pedido:', data.msg);
        }
    })
    .then(responseDetalles => responseDetalles.json())
    .then(detallesCreados => {
        console.log('Detalles del pedido creados:', detallesCreados);
        window.location.href = `carrito.html?idPedido=${idPedido}`;
    })
    .catch(error => {
        console.error('Error al crear el pedido:', error);
    });

}