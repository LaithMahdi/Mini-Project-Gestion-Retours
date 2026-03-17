package com.example.gestionretours.services;

import com.example.gestionretours.entites.RetourProduit;
import com.example.gestionretours.repos.RetourProduitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RetourProduitServiceImpl implements RetourProduitService{
    private final RetourProduitRepository repo;

    @Override
    public RetourProduit save(RetourProduit retour) {
        return repo.save(retour);
    }

    @Override
    public List<RetourProduit> findAll() {
        return repo.findAll();
    }

    @Override
    public RetourProduit findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Retour not found"));
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
