$(document).ready(function() {

});

async function login() {
    let datos = {};
    datos.email = document.getElementById('txtEmail').value;
    datos.contrasena = document.getElementById('txtContrasena').value;


    const request = await fetch("/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });


    const respuesta = await request.text();

    if(respuesta !== 'FAIL'){

        localStorage.setItem('token', respuesta);
        localStorage.setItem('email', datos.email);

       window.location.href = 'usuarios.html';
    }else{
        alert('Las credenciales son incorrectas. Por favor intente nuevamente');
    }



}