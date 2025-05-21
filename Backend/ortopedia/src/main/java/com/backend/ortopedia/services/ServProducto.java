package com.backend.ortopedia.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.ortopedia.entities.Producto;
import com.backend.ortopedia.repositories.RepoProducto;

@Service
public class ServProducto {
    @Autowired
    private RepoProducto repoProducto;

    public List<Producto> todosProductos() {
        return repoProducto.findAll();
    }
}
