$(document).ready(function() {
    cargarUsuario();
    $('#usuarios').DataTable();

    actualizarEmai();
});

function actualizarEmai(){
    document.getElementById('txt-email-usuario').innerHTML = localStorage.getItem('email');
}


async function cargarUsuario() {
    const request = await fetch("/usuarios", {
        method: "GET",
        headers: getHeaders()
    });

    const usuarios = await request.json();


    let usuariosHtml = '';
    usuarios.forEach(usuario => {

        let botonEliminar =`<a href="#" onclick="eliminarUsuario(${usuario.id})" class="btn btn-danger btn-circle">
                                 <i class="fas fa-trash"></i>
                            </a>`;


        usuariosHtml += `
            <tr>
                <td>${usuario.id}</td>
                <td>${usuario.nombre} ${usuario.apellido}</td>
                <td>${usuario.email}</td>
                <td>${usuario.telefono}</td>
                <td>
                     ${botonEliminar}
                </td>
            </tr>
        `;
    });

    document.querySelector('#usuarios tbody').innerHTML = usuariosHtml;
}

function getHeaders(){
    return{
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization':localStorage.getItem('token')
                      };
}

async function eliminarUsuario(id){

        if(!confirm("¿Seguro que desea eliminar este registro?")){
            return
        }

        const request = await fetch('/usuarios/' + id, {
            method: "DELETE",
            headers: getHeaders()
        });

        location.reload();




}

