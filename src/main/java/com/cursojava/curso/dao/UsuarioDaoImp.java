package com.cursojava.curso.dao;
import com.cursojava.curso.models.Usuario;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;


@Repository
@Transactional
public class UsuarioDaoImp implements   UsuarioDao {


    @PersistenceContext
     EntityManager entityManager;

    @Override
    @Transactional
    public List<Usuario> getUsuarios() {
        String sqlQuery= "FROM Usuario";
        List<Usuario> resultado= entityManager.createQuery(sqlQuery).getResultList();
        return resultado;
    }

    @Override
    public void eliminar(Long id) {
        Usuario usuario = entityManager.find(Usuario.class, id);
        entityManager.remove(usuario);
    }

    @Override
    public void registrar(Usuario usuario) {
        entityManager.merge(usuario);
    }

    @Override
    public Usuario obtenerUsuario(Usuario usuario) {
        String query = "FROM Usuario WHERE email = :email";

        try {
            Usuario usuarioEncontrado = entityManager.createQuery(query, Usuario.class)
                    .setParameter("email", usuario.getEmail())
                    .getSingleResult();

            String contrasenaEncriptada = usuarioEncontrado.getContrasena();

            Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);

            if(argon2.verify(contrasenaEncriptada, usuario.getContrasena())){
                return  usuarioEncontrado;
            }
            return  null;

        } catch (NoResultException e) {
            return null;
        }
    }



}
