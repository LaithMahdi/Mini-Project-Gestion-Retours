package com.example.gestionretours.controllers;

import com.example.gestionretours.config.ApiResponse;
import com.example.gestionretours.config.PaginatedApiResponse;
import com.example.gestionretours.config.PaginatedResponse;
import com.example.gestionretours.dto.NonConformiteDTO;
import com.example.gestionretours.entites.Gravite;
import com.example.gestionretours.entites.NonConformite;
import com.example.gestionretours.services.NonConformiteService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/non-conformites")
@RequiredArgsConstructor
@Tag(name = "Non Conformite API", description = "API for managing non conformities related to product returns")
@SecurityRequirement(name = "bearerAuth")
public class NonConformiteController {

    private final NonConformiteService service;

    @PostMapping("/{produitId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<NonConformite>> create(
            @PathVariable Long produitId,
            @RequestBody NonConformite nc) {

        return ResponseEntity.ok(
                ApiResponse.success("Created successfully", service.create(nc, produitId))
        );
    }

    @PatchMapping("/patch/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<NonConformite>> patch(
            @PathVariable Long id,
            @RequestBody NonConformite nc) {

        return ResponseEntity.ok(
                ApiResponse.success("Updated successfully", service.patch(id, nc))
        );
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<NonConformite>> update(
            @PathVariable Long id,
            @RequestBody NonConformite nc) {

        return ResponseEntity.ok(
                ApiResponse.success("Updated successfully", service.update(id, nc))
        );
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public ResponseEntity<PaginatedApiResponse<NonConformiteDTO>> getAll(
            @RequestParam(required = false) String produit,
            @RequestParam(required = false) Gravite gravite,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {

        NonConformiteFilter filter = new NonConformiteFilter(produit, gravite);

        PaginatedResponse<NonConformite> response =
                service.findAllWithFilterAndPagination(filter, page, size);

        java.util.List<NonConformiteDTO> dtoData = response.getData().stream()
                .map(NonConformiteDTO::fromEntity)
                .toList();

        return ResponseEntity.ok(
                new PaginatedApiResponse<>(
                        true,
                        "Fetched successfully",
                        dtoData,
                        response.getEdgeInfo()
                )
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public ResponseEntity<ApiResponse<NonConformiteDTO>> getById(@PathVariable Long id) {
        NonConformite nc = service.getById(id);
        return ResponseEntity.ok(
                ApiResponse.success("Fetched successfully", NonConformiteDTO.fromEntity(nc))
        );
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(
                ApiResponse.success("Deleted successfully", null)
        );
    }
}