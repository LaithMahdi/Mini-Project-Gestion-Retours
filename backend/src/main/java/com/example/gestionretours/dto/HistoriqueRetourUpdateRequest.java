package com.example.gestionretours.dto;

import com.example.gestionretours.entites.HistoriqueRetour;
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
public class HistoriqueRetourUpdateRequest {
    private String action;
    private UUID employeId;
    private LocalDateTime date;
}

