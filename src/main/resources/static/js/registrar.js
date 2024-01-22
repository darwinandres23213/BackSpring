$(document).ready(function() {

});

async function registrarUsuario() {
    let datos = {};
    datos.nombre = document.getElementById('textNombre').value;
    datos.apellido = document.getElementById('textApellido').value;
    datos.email = document.getElementById('textEmail').value;
    datos.contrasena = document.getElementById('textContrasena').value;
    datos.telefono= document.getElementById('textTelefono').value == '' ? '-' :  document.getElementById('textTelefono').value;
    let confirmarContrasena = document.getElementById('txtConfirmarContrasena').value;


    if (datos.contrasena !== confirmarContrasena) {
        alert('Las contraseñas no coinciden');
        return;
    }

    const request = await fetch("/usuarios", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });

    alert('Tu cuenta fue Creada éxitosamente')

    window.location.href = 'login.html';


}
