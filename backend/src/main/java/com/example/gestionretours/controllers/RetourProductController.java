package com.example.gestionretours.controllers;

import com.example.gestionretours.config.ApiResponse;
import com.example.gestionretours.config.RetourApiErrorResponses;
import com.example.gestionretours.config.PaginatedApiResponse;
import com.example.gestionretours.config.PaginatedResponse;
import com.example.gestionretours.dto.RetourProduitCreateRequest;
import com.example.gestionretours.dto.RetourProduitResponse;
import com.example.gestionretours.dto.RetourProduitUpdateRequest;
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
import java.util.stream.Collectors;


@RestController
@RequestMapping("/retours")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Retour Produit API", description = "API for managing product returns")
@SecurityRequirement(name = "bearerAuth")
@RetourApiErrorResponses
public class RetourProductController {

    private final RetourProduitService service;

    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<RetourProduitResponse>> create(@Valid @RequestBody RetourProduitCreateRequest request) {
        RetourProduit savedRetour = service.save(request.toEntity());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Retour produit created successfully", RetourProduitResponse.fromEntity(savedRetour)));
    }

    @PatchMapping("/patch/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<RetourProduitResponse>> patch(@PathVariable Long id, @RequestBody RetourProduitUpdateRequest request) {
        RetourProduit retour = request.toEntity();
        RetourProduit updatedRetour = service.patch(id, retour);
        return ResponseEntity.ok(ApiResponse.success("Retour produit updated successfully", RetourProduitResponse.fromEntity(updatedRetour)));
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<RetourProduitResponse>> put(@PathVariable Long id, @Valid @RequestBody RetourProduitUpdateRequest request) {
        RetourProduit retour = request.toEntity();
        RetourProduit updatedRetour = service.update(id, retour);
        return ResponseEntity.ok(ApiResponse.success("Retour produit updated successfully", RetourProduitResponse.fromEntity(updatedRetour)));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public ResponseEntity<PaginatedApiResponse<RetourProduitResponse>> getAll(
            @RequestParam(required = false) String client,
            @RequestParam(required = false) String produit,
            @RequestParam(required = false) EtatTraitement etatTraitement,
            @RequestParam(required = false) Integer numberOfMonths,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {

        RetourFilter filter = new RetourFilter(client, produit, etatTraitement, numberOfMonths);
        PaginatedResponse<RetourProduit> response = service.findAllWithFilterAndPagination(filter, page, size);
        List<RetourProduitResponse> responseData = response.getData().stream()
                .map(RetourProduitResponse::fromEntity)
                .collect(Collectors.toList());
        PaginatedApiResponse<RetourProduitResponse> paginatedApiResponse = new PaginatedApiResponse<>(
                true,
                "Retour produits fetched successfully",
                responseData,
                response.getEdgeInfo()
        );
        return ResponseEntity.ok(paginatedApiResponse);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public ResponseEntity<ApiResponse<List<RetourProduitResponse>>> getAllNoFilter() {
        List<RetourProduit> retours = service.findAll();
        List<RetourProduitResponse> responseData = retours.stream()
                .map(RetourProduitResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(
                ApiResponse.success("All retour produits fetched successfully", responseData)
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public ResponseEntity<ApiResponse<RetourProduitResponse>> getById(@PathVariable Long id) {
        RetourProduit retour = service.findById(id);
        return ResponseEntity.ok(ApiResponse.success("Retour produit fetched successfully", RetourProduitResponse.fromEntity(retour)));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Retour produit deleted successfully", null));
    }
}
