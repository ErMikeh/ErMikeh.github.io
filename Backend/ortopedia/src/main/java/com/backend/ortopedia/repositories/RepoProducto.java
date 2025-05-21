package com.backend.ortopedia.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.ortopedia.entities.Producto;

public interface RepoProducto extends JpaRepository<Producto, Integer> {

}
