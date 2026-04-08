package com.example.gestionretours.services;

import com.example.gestionretours.config.EdgeInfo;
import com.example.gestionretours.config.PaginatedResponse;
import com.example.gestionretours.controllers.HistoriqueRetourFilter;
import com.example.gestionretours.entites.HistoriqueRetour;
import com.example.gestionretours.repos.HistoriqueRetourRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public PaginatedResponse<HistoriqueRetour> findAllWithFilterAndPagination(HistoriqueRetourFilter filter, int page, int size) {
        List<HistoriqueRetour> allHistoriques = repo.findAll();
        List<HistoriqueRetour> filteredHistoriques = allHistoriques.stream()
                .filter(h -> filterByRetourId(h, filter.getRetourId()))
                .filter(h -> filterByAction(h, filter.getAction()))
                .collect(Collectors.toList());

        // Calculate pagination
        long totalItems = filteredHistoriques.size();
        int totalPages = (int) Math.ceil((double) totalItems / size);

        // Validate page number
        if (page < 1) page = 1;
        if (page > totalPages && totalPages > 0) page = totalPages;

        // Get paginated data
        int startIndex = (page - 1) * size;
        int endIndex = Math.min(startIndex + size, (int) totalItems);
        List<HistoriqueRetour> pageData = filteredHistoriques.subList(startIndex, endIndex);

        // Create edge info
        EdgeInfo edgeInfo = new EdgeInfo(
                page < totalPages,
                page > 1,
                totalItems,
                page
        );

        return new PaginatedResponse<>(pageData, edgeInfo);
    }

    private boolean filterByRetourId(HistoriqueRetour historique, Long retourId) {
        if (retourId == null) {
            return true;
        }
        return historique.getRetour() != null && historique.getRetour().getId().equals(retourId);
    }

    private boolean filterByAction(HistoriqueRetour historique, String action) {
        if (action == null || action.isBlank()) {
            return true;
        }
        return historique.getAction().toLowerCase().contains(action.toLowerCase());
    }
}
