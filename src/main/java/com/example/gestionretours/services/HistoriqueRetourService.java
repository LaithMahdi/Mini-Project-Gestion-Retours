package com.example.gestionretours.services;

import com.example.gestionretours.entites.HistoriqueRetour;

import java.util.List;

public interface HistoriqueRetourService {
    HistoriqueRetour save(HistoriqueRetour historique);
    List<HistoriqueRetour> findAll();
    HistoriqueRetour findById(Long id);
    void delete(Long id);
    HistoriqueRetour patch(Long id, HistoriqueRetour historique);
    HistoriqueRetour update(Long id, HistoriqueRetour historique);
    List<HistoriqueRetour> findByRetourId(Long retourId);
}

