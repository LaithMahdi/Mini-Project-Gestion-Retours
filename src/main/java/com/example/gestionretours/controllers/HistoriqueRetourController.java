package com.example.gestionretours.controllers;

import com.example.gestionretours.config.ApiResponse;
import com.example.gestionretours.dto.HistoriqueRetourCreateRequest;
import com.example.gestionretours.dto.HistoriqueRetourResponse;
import com.example.gestionretours.dto.HistoriqueRetourUpdateRequest;
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
import java.util.stream.Collectors;


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
    public ResponseEntity<ApiResponse<HistoriqueRetourResponse>> create(@Valid @RequestBody HistoriqueRetourCreateRequest request) {
        HistoriqueRetour historique = HistoriqueRetour.builder()
                .action(request.getAction())
                .date(request.getDate())
                .build();
        HistoriqueRetour savedHistorique = service.save(historique);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Historique retour created successfully", HistoriqueRetourResponse.fromEntity(savedHistorique)));
    }

    @PatchMapping("/patch/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<HistoriqueRetourResponse>> patch(@PathVariable Long id, @RequestBody HistoriqueRetourUpdateRequest request) {
        HistoriqueRetour historique = HistoriqueRetour.builder()
                .action(request.getAction())
                .date(request.getDate())
                .build();
        HistoriqueRetour updatedHistorique = service.patch(id, historique);
        return ResponseEntity.ok(ApiResponse.success("Historique retour updated successfully", HistoriqueRetourResponse.fromEntity(updatedHistorique)));
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<HistoriqueRetourResponse>> put(@PathVariable Long id, @Valid @RequestBody HistoriqueRetourUpdateRequest request) {
        HistoriqueRetour historique = HistoriqueRetour.builder()
                .action(request.getAction())
                .date(request.getDate())
                .build();
        HistoriqueRetour updatedHistorique = service.update(id, historique);
        return ResponseEntity.ok(ApiResponse.success("Historique retour updated successfully", HistoriqueRetourResponse.fromEntity(updatedHistorique)));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public ResponseEntity<ApiResponse<List<HistoriqueRetourResponse>>> getAll() {
        List<HistoriqueRetour> historiques = service.findAll();
        List<HistoriqueRetourResponse> responseData = historiques.stream()
                .map(HistoriqueRetourResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(
                ApiResponse.success("All historique retours fetched successfully", responseData)
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public ResponseEntity<ApiResponse<HistoriqueRetourResponse>> getById(@PathVariable Long id) {
        HistoriqueRetour historique = service.findById(id);
        return ResponseEntity.ok(ApiResponse.success("Historique retour fetched successfully", HistoriqueRetourResponse.fromEntity(historique)));
    }

    @GetMapping("/retour/{retourId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public ResponseEntity<ApiResponse<List<HistoriqueRetourResponse>>> getByRetourId(@PathVariable Long retourId) {
        List<HistoriqueRetour> historiques = service.findByRetourId(retourId);
        List<HistoriqueRetourResponse> responseData = historiques.stream()
                .map(HistoriqueRetourResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success("Historique retour fetched successfully", responseData));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Historique retour deleted successfully", null));
    }
}

