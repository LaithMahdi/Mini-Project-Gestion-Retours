package com.example.gestionretours.controllers;

import com.example.gestionretours.config.ApiResponse;
import com.example.gestionretours.config.PaginatedApiResponse;
import com.example.gestionretours.config.PaginatedResponse;
import com.example.gestionretours.entites.EtatTraitement;
import com.example.gestionretours.entites.RetourProduit;
import com.example.gestionretours.services.RetourProduitService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/retours")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Retour Produit API", description = "API for managing product returns")
@SecurityRequirement(name = "bearerAuth")
public class RetourProductController {

    private final RetourProduitService service;

    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<RetourProduit>> create(@Valid @RequestBody RetourProduit retour) {
        RetourProduit savedRetour = service.save(retour);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Retour produit created successfully", savedRetour));
    }

    @PatchMapping("/patch/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<RetourProduit>> patch(@PathVariable Long id,@RequestBody RetourProduit retour) {
        RetourProduit updatedRetour = service.patch(id, retour);
        return ResponseEntity.ok(ApiResponse.success("Retour produit updated successfully", updatedRetour));
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<RetourProduit>> put(@PathVariable Long id,@Valid @RequestBody RetourProduit retour) {
        RetourProduit updatedRetour = service.update(id, retour);
        return ResponseEntity.ok(ApiResponse.success("Retour produit updated successfully", updatedRetour));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public ResponseEntity<PaginatedApiResponse<RetourProduit>> getAll(
            @RequestParam(required = false) String client,
            @RequestParam(required = false) String produit,
            @RequestParam(required = false) EtatTraitement etatTraitement,
            @RequestParam(required = false) Integer numberOfMonths,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {

        RetourFilter filter = new RetourFilter(client, produit, etatTraitement, numberOfMonths);
        PaginatedResponse<RetourProduit> response = service.findAllWithFilterAndPagination(filter, page, size);
        PaginatedApiResponse<RetourProduit> paginatedApiResponse = new PaginatedApiResponse<>(
                true,
                "Retour produits fetched successfully",
                response.getData(),
                response.getEdgeInfo()
        );
        return ResponseEntity.ok(paginatedApiResponse);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public ResponseEntity<ApiResponse<List<RetourProduit>>> getAllNoFilter() {
        List<RetourProduit> retours = service.findAll();
        return ResponseEntity.ok(
                ApiResponse.success("All retour produits fetched successfully", retours)
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public ResponseEntity<ApiResponse<RetourProduit>> getById(@PathVariable Long id) {
        RetourProduit retour = service.findById(id);
        return ResponseEntity.ok(ApiResponse.success("Retour produit fetched successfully", retour));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Retour produit deleted successfully", null));
    }
}
