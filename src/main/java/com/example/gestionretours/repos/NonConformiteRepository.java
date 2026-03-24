package com.example.gestionretours.repos;

import com.example.gestionretours.entites.NonConformite;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface NonConformiteRepository extends JpaRepository<NonConformite, Long> {
    List<NonConformite> findByProduitId(Long produitId);
    List<NonConformite> findByGravite(String gravite);
}