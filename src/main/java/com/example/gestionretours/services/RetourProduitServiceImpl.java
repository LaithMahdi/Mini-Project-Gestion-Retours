package com.example.gestionretours.services;

import com.example.gestionretours.controllers.RetourFilter;
import com.example.gestionretours.entites.RetourProduit;
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

    @Override
    public PaginatedResponse<RetourProduit> findAllWithFilterAndPagination(RetourFilter filter, int page, int size) {
        List<RetourProduit> allRetours = repo.findAll();
        List<RetourProduit> filteredRetours = allRetours.stream()
                .filter(retour -> filterByClient(retour, filter.getClient()))
                .filter(retour -> filterByProduit(retour, filter.getProduit()))
                .filter(retour -> filterByEtatTraitement(retour, filter.getEtatTraitement()))
                .filter(retour -> filterByDate(retour, filter.getNumberOfMonths()))
                .collect(Collectors.toList());
        
        // Calculate pagination
        long totalItems = filteredRetours.size();
        int totalPages = (int) Math.ceil((double) totalItems / size);
        
        // Validate page number
        if (page < 1) page = 1;
        if (page > totalPages && totalPages > 0) page = totalPages;
        
        // Get paginated data
        int startIndex = (page - 1) * size;
        int endIndex = Math.min(startIndex + size, (int) totalItems);
        List<RetourProduit> pageData = filteredRetours.subList(startIndex, endIndex);
        
        // Create edge info
        EdgeInfo edgeInfo = new EdgeInfo(
                page < totalPages,
                page > 1,
                totalItems,
                page
        );
        
        return new PaginatedResponse<>(pageData, edgeInfo);
    }

    private boolean filterByClient(RetourProduit retour, String client) {
        if (client == null || client.isEmpty()) return true;
        return retour.getClient().toLowerCase().contains(client.toLowerCase());
    }

    private boolean filterByProduit(RetourProduit retour, String produit) {
        if (produit == null || produit.isEmpty()) return true;
        return retour.getProduit().toLowerCase().contains(produit.toLowerCase());
    }

    private boolean filterByEtatTraitement(RetourProduit retour, Object etatTraitement) {
        if (etatTraitement == null) return true;
        return retour.getEtatTraitement().equals(etatTraitement);
    }

    private boolean filterByDate(RetourProduit retour, Integer numberOfMonths) {
        if (numberOfMonths == null || numberOfMonths <= 0) return true;
        if (numberOfMonths < 1 || numberOfMonths > 12) return true;
    
        LocalDate retourDate = retour.getDate();
        int retourMonth = retourDate.getMonthValue();
        return retourMonth == numberOfMonths;
    }
}


