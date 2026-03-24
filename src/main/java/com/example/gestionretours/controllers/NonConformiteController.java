package com.example.gestionretours.controllers;

import com.example.gestionretours.config.ApiResponse;
import com.example.gestionretours.config.PaginatedApiResponse;
import com.example.gestionretours.config.PaginatedResponse;
import com.example.gestionretours.entites.Gravite;
import com.example.gestionretours.entites.NonConformite;
import com.example.gestionretours.services.NonConformiteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/non-conformites")
@RequiredArgsConstructor
public class NonConformiteController {

    private final NonConformiteService service;

    @PostMapping("/{produitId}")
    public ResponseEntity<ApiResponse<NonConformite>> create(
            @PathVariable Long produitId,
            @RequestBody NonConformite nc) {

        return ResponseEntity.ok(
                ApiResponse.success("Created successfully", service.create(nc, produitId))
        );
    }

    @PatchMapping("/patch/{id}")
    public ResponseEntity<ApiResponse<NonConformite>> patch(
            @PathVariable Long id,
            @RequestBody NonConformite nc) {

        return ResponseEntity.ok(
                ApiResponse.success("Updated successfully", service.patch(id, nc))
        );
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<NonConformite>> update(
            @PathVariable Long id,
            @RequestBody NonConformite nc) {

        return ResponseEntity.ok(
                ApiResponse.success("Updated successfully", service.update(id, nc))
        );
    }

    @GetMapping
    public ResponseEntity<PaginatedApiResponse<NonConformite>> getAll(
            @RequestParam(required = false) String produit,
            @RequestParam(required = false) Gravite gravite,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {

        NonConformiteFilter filter = new NonConformiteFilter(produit, gravite);

        PaginatedResponse<NonConformite> response =
                service.findAllWithFilterAndPagination(filter, page, size);

        return ResponseEntity.ok(
                new PaginatedApiResponse<>(
                        true,
                        "Fetched successfully",
                        response.getData(),
                        response.getEdgeInfo()
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<NonConformite>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(
                ApiResponse.success("Fetched successfully", service.getById(id))
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(
                ApiResponse.success("Deleted successfully", null)
        );
    }
}