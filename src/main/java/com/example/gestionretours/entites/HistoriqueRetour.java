package com.example.gestionretours.entites;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "historique_retours")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistoriqueRetour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Retour is required")
    @ManyToOne
    @JoinColumn(name = "retour_id", nullable = false)
    @JsonBackReference
    private RetourProduit retour;

    @NotBlank(message = "Action is required")
    @Column(nullable = false, length = 500)
    private String action;

    @NotNull(message = "Employee is required")
    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private User employe;

    @NotNull(message = "Date is required")
    @Column(nullable = false)
    private LocalDateTime date;

    @PrePersist
    public void onPrePersist() {
        if (this.date == null) {
            this.date = LocalDateTime.now();
        }
    }
}

