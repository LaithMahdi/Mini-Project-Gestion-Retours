package com.example.gestionretours.services;

import com.example.gestionretours.config.PaginatedResponse;
import com.example.gestionretours.controllers.HistoriqueRetourFilter;
import com.example.gestionretours.dto.HistoriqueRetourCreateRequest;
import com.example.gestionretours.dto.HistoriqueRetourUpdateRequest;
import com.example.gestionretours.entites.HistoriqueRetour;

import java.util.List;

public interface HistoriqueRetourService {
    HistoriqueRetour save(HistoriqueRetour historique);
    HistoriqueRetour create(HistoriqueRetourCreateRequest request);
    HistoriqueRetour patchWithRelations(Long id, HistoriqueRetourUpdateRequest request);
    HistoriqueRetour updateWithRelations(Long id, HistoriqueRetourUpdateRequest request);
    List<HistoriqueRetour> findAll();
    PaginatedResponse<HistoriqueRetour> findAllWithFilterAndPagination(HistoriqueRetourFilter filter, int page, int size);
    HistoriqueRetour findById(Long id);
    void delete(Long id);
    HistoriqueRetour patch(Long id, HistoriqueRetour historique);
    HistoriqueRetour update(Long id, HistoriqueRetour historique);
    List<HistoriqueRetour> findByRetourId(Long retourId);
}

