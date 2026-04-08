package com.example.gestionretours.dto;

import com.example.gestionretours.entites.EtatTraitement;
import com.example.gestionretours.entites.RetourProduit;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RetourProduitUpdateRequest {
    @Size(min = 3, max = 100, message = "Product name must be between 3 and 100 characters")
    private String produit;

    @Size(min = 3, max = 50, message = "Client name must be between 3 and 50 characters")
    private String client;

    @Size(min = 5, max = 500, message = "Reason must be between 5 and 500 characters")
    private String raison;

    private EtatTraitement etatTraitement;

    private LocalDate date;

    public RetourProduit toEntity() {
        return RetourProduit.builder()
                .produit(this.produit)
                .client(this.client)
                .raison(this.raison)
                .etatTraitement(this.etatTraitement)
                .date(this.date)
                .build();
    }
}


