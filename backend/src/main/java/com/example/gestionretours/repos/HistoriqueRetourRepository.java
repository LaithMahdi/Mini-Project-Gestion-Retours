package com.example.gestionretours.repos;

import com.example.gestionretours.entites.HistoriqueRetour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoriqueRetourRepository extends JpaRepository<HistoriqueRetour, Long> {
    List<HistoriqueRetour> findByRetourId(Long retourId);
}

