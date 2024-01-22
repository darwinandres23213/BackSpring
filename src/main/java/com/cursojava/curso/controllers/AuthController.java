package com.cursojava.curso.controllers;

import com.cursojava.curso.dao.UsuarioDao;
import com.cursojava.curso.models.Usuario;
import com.cursojava.curso.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class AuthController {

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(@RequestBody Usuario usuario){
        try {
            Usuario usuarioLogueado = usuarioDao.obtenerUsuario(usuario);

            if(usuarioLogueado != null){

                String token=jwtUtil.create(String.valueOf(usuarioLogueado.getId()), usuarioLogueado.getEmail());

                return token ;
            }
            return "FAIL";
        } catch (Exception e) {
            // Agrega mensajes de registro para la excepción
            e.printStackTrace(); // Esto imprimirá la traza de la pila en la consola del servidor
            return "Error en el servidor" + e;
        }
    }

}
