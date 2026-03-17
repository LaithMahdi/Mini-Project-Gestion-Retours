package com.example.gestionretours.services;

import com.example.gestionretours.controllers.RetourFilter;
import com.example.gestionretours.entites.RetourProduit;
import com.example.gestionretours.config.PaginatedResponse;

import java.util.List;

public interface RetourProduitService {
    RetourProduit save(RetourProduit retour);
    List<RetourProduit> findAll();
    RetourProduit findById(Long id);
    void delete(Long id);
    RetourProduit patch(Long id, RetourProduit retour);
    RetourProduit update(Long id, RetourProduit retour);
    PaginatedResponse<RetourProduit> findAllWithFilterAndPagination(RetourFilter filter, int page, int size);

}
