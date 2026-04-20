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
public class NonConformiteDTO {
    private Long id;
    private String description;
    private Gravite gravite;
    private LocalDateTime date;
    private Long productId;

    public static NonConformiteDTO fromEntity(NonConformite nc) {
        return NonConformiteDTO.builder()
                .id(nc.getId())
                .description(nc.getDescription())
                .gravite(nc.getGravite())
                .date(nc.getDate())
                .productId(nc.getProduit() != null ? nc.getProduit().getId() : null)
                .build();
    }
}

