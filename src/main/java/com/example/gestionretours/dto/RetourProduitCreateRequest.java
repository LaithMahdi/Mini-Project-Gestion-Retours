package com.example.gestionretours.dto;

import com.example.gestionretours.entites.EtatTraitement;
import com.example.gestionretours.entites.RetourProduit;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
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
public class RetourProduitCreateRequest {
    @NotBlank(message = "Product name is required")
    @Size(min = 3, max = 100, message = "Product name must be between 3 and 100 characters")
    private String produit;

    @NotBlank(message = "Client name is required")
    @Size(min = 3, max = 50, message = "Client name must be between 3 and 50 characters")
    private String client;

    @NotBlank(message = "Reason is required")
    @Size(min = 5, max = 500, message = "Reason must be between 5 and 500 characters")
    private String raison;

    @NotNull(message = "Treatment state is required")
    private EtatTraitement etatTraitement;

    @NotNull(message = "Date is required")
    @PastOrPresent(message = "Date cannot be in the future")
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

