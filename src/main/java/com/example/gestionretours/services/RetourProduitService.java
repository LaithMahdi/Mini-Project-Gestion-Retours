package com.example.gestionretours.services;

import com.example.gestionretours.entites.RetourProduit;
import java.util.List;

public interface RetourProduitService {
    RetourProduit save(RetourProduit retour);
    List<RetourProduit> findAll();
    RetourProduit findById(Long id);
    void delete(Long id);
}
