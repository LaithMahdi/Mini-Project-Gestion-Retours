package com.example.gestionretours.controllers;

import com.example.gestionretours.config.ApiResponse;
import com.example.gestionretours.entites.RetourProduit;
import com.example.gestionretours.services.RetourProduitService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/retours")
@RequiredArgsConstructor
@Slf4j
public class RetourProduitController {

    private final RetourProduitService service;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<RetourProduit>> create(@Valid @RequestBody RetourProduit retour) {
        RetourProduit savedRetour = service.save(retour);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Retour produit created successfully", savedRetour));
    }

    @PatchMapping("/patch/{id}")
    public ResponseEntity<ApiResponse<RetourProduit>> patch(@PathVariable Long id,@RequestBody RetourProduit retour) {
        RetourProduit updatedRetour = service.patch(id, retour);
        return ResponseEntity.ok(ApiResponse.success("Retour produit updated successfully", updatedRetour));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<RetourProduit>> put(@PathVariable Long id,@Valid @RequestBody RetourProduit retour) {
        RetourProduit updatedRetour = service.update(id, retour);
        return ResponseEntity.ok(ApiResponse.success("Retour produit updated successfully", updatedRetour));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<RetourProduit>>> getAll() {
        List<RetourProduit> retours = service.findAll();
        return ResponseEntity.ok(ApiResponse.success("Retour produits fetched successfully", retours));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RetourProduit>> getById(@PathVariable Long id) {
        RetourProduit retour = service.findById(id);
        return ResponseEntity.ok(ApiResponse.success("Retour produit fetched successfully", retour));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Retour produit deleted successfully", null));
    }
}