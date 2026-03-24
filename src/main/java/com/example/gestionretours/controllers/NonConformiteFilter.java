package com.example.gestionretours.controllers;

import com.example.gestionretours.entites.Gravite;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NonConformiteFilter {
    private String produit;
    private Gravite gravite;
}