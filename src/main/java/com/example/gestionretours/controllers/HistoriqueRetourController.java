package com.example.gestionretours.controllers;

import com.example.gestionretours.config.ApiResponse;
import com.example.gestionretours.entites.HistoriqueRetour;
import com.example.gestionretours.services.HistoriqueRetourService;
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
@RequestMapping("/historique-retours")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Historique Retour API", description = "API for managing return history")
@SecurityRequirement(name = "bearerAuth")
public class HistoriqueRetourController {

    private final HistoriqueRetourService service;

    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<HistoriqueRetour>> create(@Valid @RequestBody HistoriqueRetour historique) {
        HistoriqueRetour savedHistorique = service.save(historique);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Historique retour created successfully", savedHistorique));
    }

    @PatchMapping("/patch/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<HistoriqueRetour>> patch(@PathVariable Long id, @RequestBody HistoriqueRetour historique) {
        HistoriqueRetour updatedHistorique = service.patch(id, historique);
        return ResponseEntity.ok(ApiResponse.success("Historique retour updated successfully", updatedHistorique));
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<HistoriqueRetour>> put(@PathVariable Long id, @Valid @RequestBody HistoriqueRetour historique) {
        HistoriqueRetour updatedHistorique = service.update(id, historique);
        return ResponseEntity.ok(ApiResponse.success("Historique retour updated successfully", updatedHistorique));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public ResponseEntity<ApiResponse<List<HistoriqueRetour>>> getAll() {
        List<HistoriqueRetour> historiques = service.findAll();
        return ResponseEntity.ok(
                ApiResponse.success("All historique retours fetched successfully", historiques)
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public ResponseEntity<ApiResponse<HistoriqueRetour>> getById(@PathVariable Long id) {
        HistoriqueRetour historique = service.findById(id);
        return ResponseEntity.ok(ApiResponse.success("Historique retour fetched successfully", historique));
    }

    @GetMapping("/retour/{retourId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public ResponseEntity<ApiResponse<List<HistoriqueRetour>>> getByRetourId(@PathVariable Long retourId) {
        List<HistoriqueRetour> historiques = service.findByRetourId(retourId);
        return ResponseEntity.ok(ApiResponse.success("Historique retour fetched successfully", historiques));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Historique retour deleted successfully", null));
    }
}

