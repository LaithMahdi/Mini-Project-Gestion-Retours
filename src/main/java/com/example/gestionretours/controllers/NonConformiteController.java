package com.example.gestionretours.controllers;

import com.example.gestionretours.config.ApiResponse;
import com.example.gestionretours.config.PaginatedApiResponse;
import com.example.gestionretours.config.PaginatedResponse;
import com.example.gestionretours.dto.NonConformiteCreateRequest;
import com.example.gestionretours.dto.NonConformiteResponse;
import com.example.gestionretours.dto.NonConformiteUpdateRequest;
import com.example.gestionretours.entites.Gravite;
import com.example.gestionretours.entites.NonConformite;
import com.example.gestionretours.services.NonConformiteService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/non-conformites")
@RequiredArgsConstructor
@Tag(name = "Non Conformite API", description = "API for managing non conformities related to product returns")
@SecurityRequirement(name = "bearerAuth")
public class NonConformiteController {

    private final NonConformiteService service;

    @PostMapping("/{produitId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<NonConformiteResponse>> create(
            @PathVariable Long produitId,
            @Valid @RequestBody NonConformiteCreateRequest request) {

        NonConformite nc = NonConformite.builder()
                .description(request.getDescription())
                .gravite(request.getGravite())
                .build();
        NonConformite created = service.create(nc, produitId);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Non-conformité créée avec succès", NonConformiteResponse.fromEntity(created)));
    }

    @PatchMapping("/patch/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<NonConformiteResponse>> patch(
            @PathVariable Long id,
            @RequestBody NonConformiteUpdateRequest request) {

        NonConformite nc = NonConformite.builder()
                .description(request.getDescription())
                .gravite(request.getGravite())
                .build();
        NonConformite patched = service.patch(id, nc);
        return ResponseEntity.ok(
                ApiResponse.success("Non-conformité mise à jour avec succès", NonConformiteResponse.fromEntity(patched))
        );
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<NonConformiteResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody NonConformiteUpdateRequest request) {

        NonConformite nc = NonConformite.builder()
                .description(request.getDescription())
                .gravite(request.getGravite())
                .build();
        NonConformite updated = service.update(id, nc);
        return ResponseEntity.ok(
                ApiResponse.success("Non-conformité mise à jour avec succès", NonConformiteResponse.fromEntity(updated))
        );
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public ResponseEntity<PaginatedApiResponse<NonConformiteResponse>> getAll(
            @RequestParam(required = false) String produit,
            @RequestParam(required = false) Gravite gravite,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {

        NonConformiteFilter filter = new NonConformiteFilter(produit, gravite);

        PaginatedResponse<NonConformite> response =
                service.findAllWithFilterAndPagination(filter, page, size);

        List<NonConformiteResponse> dtoData = response.getData().stream()
                .map(NonConformiteResponse::fromEntity)
                .toList();

        return ResponseEntity.ok(
                new PaginatedApiResponse<>(
                        true,
                        "Non-conformités récupérées avec succès",
                        dtoData,
                        response.getEdgeInfo()
                )
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public ResponseEntity<ApiResponse<NonConformiteResponse>> getById(@PathVariable Long id) {
        NonConformite nc = service.getById(id);
        return ResponseEntity.ok(
                ApiResponse.success("Non-conformité récupérée avec succès", NonConformiteResponse.fromEntity(nc))
        );
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(
                ApiResponse.success("Non-conformité supprimée avec succès", null)
        );
    }
}