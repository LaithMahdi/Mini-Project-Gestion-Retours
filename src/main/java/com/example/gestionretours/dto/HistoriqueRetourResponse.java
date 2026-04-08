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
public class HistoriqueRetourResponse {
    private Long id;
    private Long retourId;
    private String action;
    private UUID employeId;
    private String employeNom;
    private String employeEmail;
    private LocalDateTime date;

    public static HistoriqueRetourResponse fromEntity(HistoriqueRetour historique) {
        return HistoriqueRetourResponse.builder()
                .id(historique.getId())
                .retourId(historique.getRetour() != null ? historique.getRetour().getId() : null)
                .action(historique.getAction())
                .employeId(historique.getEmploye() != null ? historique.getEmploye().getId() : null)
                .employeNom(historique.getEmploye() != null ? historique.getEmploye().getNom() : null)
                .employeEmail(historique.getEmploye() != null ? historique.getEmploye().getEmail() : null)
                .date(historique.getDate())
                .build();
    }
}

