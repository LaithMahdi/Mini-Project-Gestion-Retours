package com.example.gestionretours.controllers;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NonConformiteFilter {
    private String produit;
    private String gravite;
    private Integer numberOfMonths;
}