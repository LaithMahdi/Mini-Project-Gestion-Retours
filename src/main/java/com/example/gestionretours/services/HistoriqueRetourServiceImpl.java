package com.example.gestionretours.services;

import com.example.gestionretours.config.EdgeInfo;
import com.example.gestionretours.config.PaginatedResponse;
import com.example.gestionretours.controllers.HistoriqueRetourFilter;
import com.example.gestionretours.dto.HistoriqueRetourCreateRequest;
import com.example.gestionretours.dto.HistoriqueRetourUpdateRequest;
import com.example.gestionretours.entites.HistoriqueRetour;
import com.example.gestionretours.entites.RetourProduit;
import com.example.gestionretours.entites.User;
import com.example.gestionretours.repos.HistoriqueRetourRepository;
import com.example.gestionretours.repos.RetourProduitRepository;
import com.example.gestionretours.repos.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HistoriqueRetourServiceImpl implements HistoriqueRetourService {
    private final HistoriqueRetourRepository repo;
    private final RetourProduitRepository retourRepository;
    private final UserRepository userRepository;

    @Override
    public HistoriqueRetour save(HistoriqueRetour historique) {
        return repo.save(historique);
    }

    @Override
    public HistoriqueRetour create(HistoriqueRetourCreateRequest request) {
        // Load the related entities from database
        RetourProduit retour = retourRepository.findById(request.getRetourId())
                .orElseThrow(() -> new RuntimeException("Retour not found with id: " + request.getRetourId()));
        
        User employe = userRepository.findById(request.getEmployeId())
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + request.getEmployeId()));
        
        // Create HistoriqueRetour with loaded entities
        HistoriqueRetour historique = HistoriqueRetour.builder()
                .retour(retour)
                .action(request.getAction())
                .employe(employe)
                .date(request.getDate())
                .build();
        
        return repo.save(historique);
    }

    @Override
    public HistoriqueRetour patchWithRelations(Long id, HistoriqueRetourUpdateRequest request) {
        HistoriqueRetour existing = findById(id);
        
        // Update action if provided
        if (request.getAction() != null && !request.getAction().isBlank()) {
            existing.setAction(request.getAction());
        }
        
        // Update employe if provided
        if (request.getEmployeId() != null) {
            User employe = userRepository.findById(request.getEmployeId())
                    .orElseThrow(() -> new RuntimeException("Employee not found with id: " + request.getEmployeId()));
            existing.setEmploye(employe);
        }
        
        // Update date if provided
        if (request.getDate() != null) {
            existing.setDate(request.getDate());
        }
        
        return repo.save(existing);
    }

    @Override
    public HistoriqueRetour updateWithRelations(Long id, HistoriqueRetourUpdateRequest request) {
        HistoriqueRetour existing = findById(id);
        
        // Update action
        if (request.getAction() != null) {
            existing.setAction(request.getAction());
        }
        
        // Update employe
        if (request.getEmployeId() != null) {
            User employe = userRepository.findById(request.getEmployeId())
                    .orElseThrow(() -> new RuntimeException("Employee not found with id: " + request.getEmployeId()));
            existing.setEmploye(employe);
        }
        
        // Update date
        if (request.getDate() != null) {
            existing.setDate(request.getDate());
        }
        
        return repo.save(existing);
    }

    @Override
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
