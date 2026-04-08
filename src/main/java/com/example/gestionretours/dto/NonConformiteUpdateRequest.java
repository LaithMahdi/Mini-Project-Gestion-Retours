package com.example.gestionretours.dto;

import com.example.gestionretours.entites.Gravite;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NonConformiteUpdateRequest {
    private String description;
    private Gravite gravite;
}

