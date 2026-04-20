package com.example.gestionretours.dto;

import com.example.gestionretours.entites.HistoriqueRetour;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistoriqueRetourCreateRequest {
    @NotNull(message = "Retour ID is required")
    private Long retourId;

    @NotBlank(message = "Action is required")
    private String action;

    @NotNull(message = "Employee ID is required")
    private UUID employeId;

    private LocalDateTime date;
}

