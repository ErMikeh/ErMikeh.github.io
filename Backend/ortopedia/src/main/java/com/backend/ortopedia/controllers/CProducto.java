package com.backend.ortopedia.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.backend.ortopedia.entities.Producto;
import com.backend.ortopedia.services.ServProducto;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class CProducto {
    @Autowired
    private ServProducto servProducto;

    @GetMapping("/productos")
    public ResponseEntity<List<Producto>> getAllProducts() {
        System.out.println(servProducto.todosProductos());
        return ResponseEntity.ok(servProducto.todosProductos());
    }
    
}
