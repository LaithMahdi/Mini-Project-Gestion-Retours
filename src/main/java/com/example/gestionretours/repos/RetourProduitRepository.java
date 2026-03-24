package com.example.gestionretours.repos;

import com.example.gestionretours.entites.RetourProduit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RetourProduitRepository extends JpaRepository<RetourProduit, Long> {
}
