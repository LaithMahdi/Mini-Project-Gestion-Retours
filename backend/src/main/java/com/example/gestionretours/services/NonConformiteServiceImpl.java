package com.example.gestionretours.services;

import com.example.gestionretours.controllers.NonConformiteFilter;
import com.example.gestionretours.entites.Gravite;
import com.example.gestionretours.entites.NonConformite;
import com.example.gestionretours.entites.RetourProduit;
import com.example.gestionretours.repos.NonConformiteRepository;
import com.example.gestionretours.repos.RetourProduitRepository;
import com.example.gestionretours.config.PaginatedResponse;
import com.example.gestionretours.config.EdgeInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NonConformiteServiceImpl implements NonConformiteService {

    private final NonConformiteRepository ncRepo;
    private final RetourProduitRepository produitRepo;

    @Override
    public NonConformite create(NonConformite nc, Long produitId) {
        RetourProduit produit = produitRepo.findById(produitId)
                .orElseThrow(() -> new RuntimeException("Produit not found"));

        nc.setProduit(produit);
        return ncRepo.save(nc);
    }

    @Override
    public List<NonConformite> getAll() {
        return ncRepo.findAll();
    }

    @Override
    public NonConformite getById(Long id) {
        return ncRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("NonConformite not found"));
    }

    @Override
    public NonConformite update(Long id, NonConformite nc) {
        NonConformite existing = getById(id);
        existing.setDescription(nc.getDescription());
        existing.setGravite(nc.getGravite());
        existing.setDate(nc.getDate());
        return ncRepo.save(existing);
    }

    @Override
    public NonConformite patch(Long id, NonConformite nc) {
        NonConformite existing = getById(id);

        if (nc.getDescription() != null) existing.setDescription(nc.getDescription());
        if (nc.getGravite() != null) existing.setGravite(nc.getGravite());
        if (nc.getDate() != null) existing.setDate(nc.getDate());

        return ncRepo.save(existing);
    }

    @Override
    public void delete(Long id) {
        ncRepo.deleteById(id);
    }

    @Override
    public PaginatedResponse<NonConformite> findAllWithFilterAndPagination(
            NonConformiteFilter filter,
            int page,
            int size) {

        List<NonConformite> all = ncRepo.findAll();

        List<NonConformite> filtered = all.stream()
                .filter(nc -> filterByProduit(nc, filter.getProduit()))
                .filter(nc -> filterByGravite(nc, filter.getGravite()))
                .collect(Collectors.toList());

        long totalItems = filtered.size();
        int totalPages = (int) Math.ceil((double) totalItems / size);

        if (page < 1) page = 1;
        if (page > totalPages && totalPages > 0) page = totalPages;

        int start = (page - 1) * size;
        int end = Math.min(start + size, (int) totalItems);

        List<NonConformite> pageData = filtered.subList(start, end);

        EdgeInfo edgeInfo = new EdgeInfo(
                page < totalPages,
                page > 1,
                totalItems,
                page
        );

        return new PaginatedResponse<>(pageData, edgeInfo);
    }

    private boolean filterByProduit(NonConformite nc, String produit) {
        if (produit == null || produit.isEmpty()) return true;
        return nc.getProduit().getProduit().toLowerCase().contains(produit.toLowerCase());
    }

    private boolean filterByGravite(NonConformite nc, Gravite gravite) {
        if (gravite == null) return true;
        return nc.getGravite().equals(gravite);
    }

    private boolean filterByDate(NonConformite nc, Integer month) {
        if (month == null || month <= 0) return true;
        LocalDate date = nc.getDate().toLocalDate();
        return date.getMonthValue() == month;
    }
}