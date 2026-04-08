package com.example.gestionretours.services;

import com.example.gestionretours.entites.HistoriqueRetour;
import com.example.gestionretours.repos.HistoriqueRetourRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HistoriqueRetourServiceImpl implements HistoriqueRetourService {
    private final HistoriqueRetourRepository repo;

    @Override
    public HistoriqueRetour save(HistoriqueRetour historique) {
        return repo.save(historique);
    }

    @Override
    public List<HistoriqueRetour> findAll() {
        return repo.findAll();
    }

    @Override
    public HistoriqueRetour findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Historique retour not found"));
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }

    @Override
    public HistoriqueRetour patch(Long id, HistoriqueRetour historique) {
        HistoriqueRetour existing = findById(id);
        if (historique.getRetour() != null) existing.setRetour(historique.getRetour());
        if (historique.getAction() != null) existing.setAction(historique.getAction());
        if (historique.getEmploye() != null) existing.setEmploye(historique.getEmploye());
        if (historique.getDate() != null) existing.setDate(historique.getDate());
        return repo.save(existing);
    }

    @Override
    public HistoriqueRetour update(Long id, HistoriqueRetour historique) {
        HistoriqueRetour existing = findById(id);
        existing.setRetour(historique.getRetour());
        existing.setAction(historique.getAction());
        existing.setEmploye(historique.getEmploye());
        existing.setDate(historique.getDate());
        return repo.save(existing);
    }

    @Override
    public List<HistoriqueRetour> findByRetourId(Long retourId) {
        return repo.findByRetourId(retourId);
    }
}

