const urlObtenerClientes = 'http://localhost/API_tienda/obtenerClientes.php'
const urlAgregarCliente= 'http://localhost/API_tienda/agregarCliente.php'
const urlEditarCliente = 'http://localhost/API_tienda/editarCliente.php'

const nombreInput = document.querySelector('#nombre')
const correoInput = document.querySelector('#email')
const direccionInput = document.querySelector('#direccion')

let listaClientes = []

const objCliente = {
    nombre: '',
    email: '',
    direccion: ''
}

function Prueba()
{
    alert('Prueba')
}

function validarFormulario()
{
    const nombreForm = nombreInput.value;
    const correoForm  = correoInput.value;
    const direccionForm = direccionInput.value;


    if (nombreForm.trim() === '' || correoForm.trim() === '' || direccionForm.trim() === '') {
        alert('Los campos son obligatorios');
        return false; 
    }

    obtenerClientes() 
}

async function obtenerClientes() {
    console.log('Entró en obtenerClientes');
    listaClientes = await fetch(urlObtenerClientes)
    .then(respuesta => respuesta.json())
    .then(datos => datos)
    .catch(error => console.log(error))

    const correoFormulario = correoInput.value.toLowerCase();
    console.log('Email del formulario:', correoFormulario);
    const clienteEncontrado = listaClientes.find(cliente => cliente.correo === correoFormulario);

    console.log('Cliente encontrado', clienteEncontrado);
    console.log('Clientes ',listaClientes)
    if (clienteEncontrado) 
    {     
        console.log('Cliente encontrado',clienteEncontrado);
        redirigirAPagina(clienteEncontrado)    
    }
    else
    {
        console.log('Cliente no encontrado');
        agregarCliente();
    }
    
}

function agregarCliente() {
    const nuevoCliente = {
        nombre: nombreInput.value,
        correo: correoInput.value,
        direccion: direccionInput.value
    };
    console.log('creado cliente',nuevoCliente)
    fetch(urlAgregarCliente, {
        method: 'POST',
        body: JSON.stringify(nuevoCliente),
    })
        .then(respuesta => respuesta.json())
        .then(datos => datos)
        .catch(error => console.error('Error al agregar cliente:', error));
}

function redirigirAPagina(cliente) {  
    const idCliente = cliente.id_cliente || '';  
    window.location.href = `tienda.html?idCliente=${idCliente}&nombre=${cliente.nombre}&correo=${cliente.correo}&direccion=${cliente.direccion}`;
}

const btnIngresar = document.querySelector('#btnIngresar');
btnIngresar.addEventListener('click', validarFormulario);