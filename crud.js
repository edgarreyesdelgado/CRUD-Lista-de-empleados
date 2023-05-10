let listaEmpleados = [];

const objEmpleado = {
    id: '',
    nombre: '',
    apellido: '',
    telefono: '',
    email: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const apellidoInput = document.querySelector('#apellido');
const telefonoInput = document.querySelector('#telefono');
const emailInput = document.querySelector('#email');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombreInput.value === '' || apellidoInput.value === '' || telefonoInput.value === '' || emailInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editando) {
        editarEmpleado();
        editando = false;
    } else {
        objEmpleado.id = Date.now();
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.apellido = apellidoInput.value;
        objEmpleado.telefono = telefonoInput.value;
        objEmpleado.email = emailInput.value;

        agregarEmpleado();
    }
}

function agregarEmpleado() {

    listaEmpleados.push({...objEmpleado});

    mostrarEmpleados();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objEmpleado.id = '';
    objEmpleado.nombre = '';
    objEmpleado.apellido = '';
    objEmpleado.telefono = '';
    objEmpleado.email = '';
}

function mostrarEmpleados() {
    limpiarHTML();

    const divEmpleados = document.querySelector('.div-empleados');
    
    listaEmpleados.forEach(empleado => {
        const {id, nombre, apellido, telefono, email} = empleado;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id}  ${nombre}  ${apellido}  ${telefono}  ${email}  `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(empleado);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);
    });


    
}

function cargarEmpleado(empleado) {
    const {id, nombre, apellido, telefono, email} = empleado;

    nombreInput.value = nombre;
    apellidoInput.value = apellido;
    telefonoInput.value = telefono;
    emailInput.value = email;

    objEmpleado.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarEmpleado() {

    objEmpleado.nombre = nombreInput.value;
    objEmpleado.apellido = apellidoInput.value;
    objEmpleado.telefono = telefonoInput.value;
    objEmpleado.email = emailInput.value;

    listaEmpleados.map(empleado => {

        if(empleado.id === objEmpleado.id) {
            empleado.nombre = objEmpleado.nombre;
            empleado.apellido = objEmpleado.apellido;
            empleado.telefono = objEmpleado.telefono;
            empleado.email = objEmpleado.email;

        }

    });

    limpiarHTML();
    mostrarEmpleados();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

function eliminarEmpleado(id) {

    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);

    limpiarHTML();
    mostrarEmpleados();
}

function limpiarHTML() {
    const divEmpleados = document.querySelector('.div-empleados');
    while(divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}

function guardarEmpleado(nombre, apellido, telefono, email) {
    listaEmpleados.push({
    nombre,
    apellido,
    telefono,
    email,
    });
    guardarEmpleados(listaEmpleados);
    mostrarEmpleados();
}

function obtenerDatosForm(event) {
    event.preventDefault();
    const nombre = nombreInput.value;
    const apellido = apellidoInput.value;
    const telefono = telefonoInput.value;
    const email = emailInput.value;
    guardarEmpleado(nombre, apellido, telefono, email);
    event.target.reset();
}

formulario.addEventListener('submit', obtenerDatosForm);

function guardarEmpleados(arrayDeEmpleados) {
    const listaDeEmpleadosConvertidoAString = JSON.stringify(arrayDeEmpleados);
    localStorage.setItem('empleados', listaDeEmpleadosConvertidoAString);
}

function obtenerEmpleadosGuardados() {
    const listaDeEmpleadosEnString = localStorage.getItem('empleados') || '[]';
    const listaDeEmpleadosYaConvertidaEnUnArray = JSON.parse(
    listaDeEmpleadosEnString
    );
    listaEmpleados = [...listaDeEmpleadosYaConvertidaEnUnArray];
}

obtenerEmpleadosGuardados();
mostrarEmpleados();




