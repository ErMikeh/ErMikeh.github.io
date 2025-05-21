package com.backend.ortopedia.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Table(name = "productos")
public class Producto {

    @Id
    @Column(name = "idProducto")
    private Integer idProducto;

    @Column(nullable = false, length = 255)
    private String nombre;

    @Column(length = 255)
    private String descripcion;

    @Column(length = 255)
    private String imagen;

    private Float precio;

    @Column(nullable = false)
    private Integer stock;
}
