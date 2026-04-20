package com.example.gestionretours.entites;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "non_conformites")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NonConformite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "La description est obligatoire")
    @Column(nullable = false, length = 1000)
    private String description;

    @NotNull(message = "La gravité est obligatoire")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gravite gravite;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "produit_id")
    @JsonBackReference
    private RetourProduit produit;
}
