package com.example.gestionretours.dto;

import com.example.gestionretours.entites.EtatTraitement;
import com.example.gestionretours.entites.RetourProduit;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RetourProduitResponse {
    private Long id;
    private String produit;
    private String client;
    private String raison;
    private EtatTraitement etatTraitement;
    private LocalDate date;

    public static RetourProduitResponse fromEntity(RetourProduit retour) {
        return RetourProduitResponse.builder()
                .id(retour.getId())
                .produit(retour.getProduit())
                .client(retour.getClient())
                .raison(retour.getRaison())
                .etatTraitement(retour.getEtatTraitement())
                .date(retour.getDate())
                .build();
    }
}

