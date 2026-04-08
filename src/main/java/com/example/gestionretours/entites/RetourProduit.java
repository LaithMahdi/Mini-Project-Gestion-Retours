package com.example.gestionretours.entites;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(name="retours")
public class RetourProduit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Product name is required")
    @Size(min = 3, max = 100, message = "Product name must be between 3 and 100 characters")
    @Column(nullable = false)
    private String produit;

    @NotBlank(message = "Client name is required")
    @Size(min = 3, max = 50, message = "Client name must be between 3 and 50 characters")
    @Column(nullable = false)
    private String client;

    @NotBlank(message = "Reason is required")
    @Size(min = 5, max = 500, message = "Reason must be between 5 and 500 characters")
    @Column(nullable = false, length = 500)
    private String raison;

    @NotNull(message = "Treatment state is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EtatTraitement etatTraitement;

    @NotNull(message = "Date is required")
    @PastOrPresent(message = "Date cannot be in the future")
    @Column(nullable = false)
    private LocalDate date;


    @OneToMany(mappedBy = "produit", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<NonConformite> nonConformites;

    @OneToMany(mappedBy = "retour", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<HistoriqueRetour> historiques;
}