package com.example.gestionretours.controllers;

import com.example.gestionretours.entites.EtatTraitement;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RetourFilter {
    private String client;
    private String produit;
    private EtatTraitement etatTraitement;
    private Integer numberOfMonths;
}

