package com.example.gestionretours.dto;

import com.example.gestionretours.entites.Gravite;
import com.example.gestionretours.entites.NonConformite;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NonConformiteResponse {
    private Long id;
    private String description;
    private Gravite gravite;
    private LocalDateTime date;
    private Long productId;
    private String productName;

    public static NonConformiteResponse fromEntity(NonConformite nc) {
        return NonConformiteResponse.builder()
                .id(nc.getId())
                .description(nc.getDescription())
                .gravite(nc.getGravite())
                .date(nc.getDate())
                .productId(nc.getProduit() != null ? nc.getProduit().getId() : null)
                .productName(nc.getProduit() != null ? nc.getProduit().getProduit() : null)
                .build();
    }
}

