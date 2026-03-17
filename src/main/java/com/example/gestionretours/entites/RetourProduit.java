package com.example.gestionretours.entites;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class RetourProduit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String produit;
    private String client;
    private String raison;
    @Enumerated(EnumType.STRING)
    private EtatTraitement etatTraitement;
    private LocalDate date;
}
