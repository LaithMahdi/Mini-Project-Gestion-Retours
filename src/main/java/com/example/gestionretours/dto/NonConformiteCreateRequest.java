package com.example.gestionretours.dto;

import com.example.gestionretours.entites.Gravite;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NonConformiteCreateRequest {
    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Gravité is required")
    private Gravite gravite;
}

