package com.example.gestionretours.controllers;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoriqueRetourFilter {
    private Long retourId;
    private String action;
}

