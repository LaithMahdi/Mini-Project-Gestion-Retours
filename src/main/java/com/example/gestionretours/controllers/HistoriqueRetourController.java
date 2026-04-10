package com.example.gestionretours.controllers;

import com.example.gestionretours.config.ApiResponse;
import com.example.gestionretours.config.PaginatedApiResponse;
import com.example.gestionretours.config.PaginatedResponse;
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
        HistoriqueRetour savedHistorique = service.create(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Historique retour created successfully", HistoriqueRetourResponse.fromEntity(savedHistorique)));
    }

    @PatchMapping("/patch/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<HistoriqueRetourResponse>> patch(@PathVariable Long id, @RequestBody HistoriqueRetourUpdateRequest request) {
        HistoriqueRetour updatedHistorique = service.patchWithRelations(id, request);
        return ResponseEntity.ok(ApiResponse.success("Historique retour updated successfully", HistoriqueRetourResponse.fromEntity(updatedHistorique)));
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<HistoriqueRetourResponse>> put(@PathVariable Long id, @Valid @RequestBody HistoriqueRetourUpdateRequest request) {
        HistoriqueRetour updatedHistorique = service.updateWithRelations(id, request);
        return ResponseEntity.ok(ApiResponse.success("Historique retour updated successfully", HistoriqueRetourResponse.fromEntity(updatedHistorique)));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public ResponseEntity<PaginatedApiResponse<HistoriqueRetourResponse>> getAll(
            @RequestParam(required = false) Long retourId,
            @RequestParam(required = false) String action,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        HistoriqueRetourFilter filter = new HistoriqueRetourFilter(retourId, action);
        PaginatedResponse<HistoriqueRetour> response = service.findAllWithFilterAndPagination(filter, page, size);
        List<HistoriqueRetourResponse> responseData = response.getData().stream()
                .map(HistoriqueRetourResponse::fromEntity)
                .collect(Collectors.toList());
        PaginatedApiResponse<HistoriqueRetourResponse> paginatedApiResponse = new PaginatedApiResponse<>(
                true,
                "Historique retours fetched successfully",
                responseData,
                response.getEdgeInfo()
        );
        return ResponseEntity.ok(paginatedApiResponse);
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

