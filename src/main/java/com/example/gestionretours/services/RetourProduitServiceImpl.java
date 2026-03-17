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

    @Override
    public RetourProduit patch(Long id, RetourProduit retour) {
        RetourProduit existing = findById(id);
        if (retour.getProduit() != null) existing.setProduit(retour.getProduit());
        if (retour.getRaison() != null) existing.setRaison(retour.getRaison());
        if (retour.getClient() != null) existing.setClient(retour.getClient());
        if (retour.getEtatTraitement() != null) existing.setEtatTraitement(retour.getEtatTraitement());
        if (retour.getDate() != null) existing.setDate(retour.getDate());
        return   repo.save(existing);
    }


    @Override
    public RetourProduit update(Long id, RetourProduit retour) {
        RetourProduit existing = findById(id);
        existing.setProduit(retour.getProduit());
        existing.setRaison(retour.getRaison());
        existing.setClient(retour.getClient());
        existing.setEtatTraitement(retour.getEtatTraitement());
        existing.setDate(retour.getDate());
        return repo.save(existing);
    }
}
