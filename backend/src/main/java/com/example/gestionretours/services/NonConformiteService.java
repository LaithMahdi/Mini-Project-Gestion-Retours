package com.example.gestionretours.services;

import com.example.gestionretours.controllers.NonConformiteFilter;
import com.example.gestionretours.entites.NonConformite;
import com.example.gestionretours.config.PaginatedResponse;

import java.util.List;

public interface NonConformiteService {

    NonConformite create(NonConformite nc, Long produitId);

    List<NonConformite> getAll();

    NonConformite getById(Long id);

    NonConformite update(Long id, NonConformite nc);

    NonConformite patch(Long id, NonConformite nc);

    void delete(Long id);

    PaginatedResponse<NonConformite> findAllWithFilterAndPagination(
            NonConformiteFilter filter,
            int page,
            int size
    );
}