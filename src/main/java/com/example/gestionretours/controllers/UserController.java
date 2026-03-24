package com.example.gestionretours.controllers;

import com.example.gestionretours.config.ApiResponse;
import com.example.gestionretours.dto.request.AdminCreateUserRequest;
import com.example.gestionretours.dto.request.UpdateUserRequest;
import com.example.gestionretours.dto.response.UserResponse;
import com.example.gestionretours.entites.Role;
import com.example.gestionretours.services.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Slf4j
@Tag(name = "User API", description = "API for managing users")
public class UserController {

    private final UserService userService;

    // ═══════════════════════════════════════════════════════════════════════
    //  SELF-SERVICE  —  any authenticated user
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * GET /api/me
     * Returns the profile of the currently logged-in user.
     * Header: Authorization: Bearer <token>
     */
    @GetMapping("/api/me")
    public ResponseEntity<ApiResponse<UserResponse>> getMyProfile(
            @AuthenticationPrincipal UserDetails userDetails) {

        UserResponse profile = userService.getMyProfile(userDetails.getUsername());
        log.info("Profil récupéré pour l'utilisateur : {}", userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Profil récupéré", profile));
    }

    // ═══════════════════════════════════════════════════════════════════════
    //  ADMIN ONLY  —  /api/admin/users/**
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * POST /api/admin/users
     * Admin creates a user with any role (ADMIN, MANAGER, USER).
     *
     * Body: { "nom":"Bob", "email":"bob@mail.com", "password":"pass123", "role":"MANAGER" }
     */
    @PostMapping("/admin/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserResponse>> adminCreateUser(
            @Valid @RequestBody AdminCreateUserRequest request) {

        UserResponse created = userService.adminCreateUser(request);
        log.info("Utilisateur créé par admin : {} avec le rôle {}", request.getEmail(), request.getRole());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Utilisateur créé par l'administrateur", created));
    }

    /**
     * GET /api/admin/users
     * List all users.
     */
    @GetMapping("/admin/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {
        List<UserResponse> users = userService.getAllUsers();
        log.info("Liste des utilisateurs récupérée : {} utilisateurs", users.size());
        return ResponseEntity.ok(
                ApiResponse.success("Liste des utilisateurs", users));
    }

    /**
     * GET /api/admin/users/{id}
     * Get a single user by UUID.
     */
    @GetMapping("/admin/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable UUID id) {
        UserResponse user = userService.getUserById(id);
        log.info("Utilisateur récupéré : {}", id);
        return ResponseEntity.ok(
                ApiResponse.success("Utilisateur trouvé", user));
    }

    /**
     * PUT /api/admin/users/{id}
     * Update name, email, role, password (optional), enabled flag.
     *
     * Body: { "nom":"Bob", "email":"bob@mail.com", "role":"ADMIN",
     *         "password":"newpass", "enabled": true }
     */
    @PutMapping("/admin/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserResponse>> updateUser(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateUserRequest request) {

        UserResponse updated = userService.updateUser(id, request);
        log.info("Utilisateur mis à jour : {}", id);
        return ResponseEntity.ok(ApiResponse.success("Utilisateur mis à jour", updated));
    }

    /**
     * DELETE /api/admin/users/{id}
     * Permanently delete a user.
     */
    @DeleteMapping("/admin/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable UUID id) {
        userService.deleteUser(id);
        log.info("Utilisateur supprimé : {}", id);
        return ResponseEntity.ok(ApiResponse.success("Utilisateur supprimé", null));
    }

    /**
     * GET /api/admin/users/role/{role}
     * Filter users by role: ADMIN | MANAGER | USER
     */
    @GetMapping("/admin/users/role/{role}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getUsersByRole(
            @PathVariable Role role) {

        List<UserResponse> users = userService.getUsersByRole(role);
        log.info("Utilisateurs filtrés par rôle {} : {} utilisateurs", role, users.size());
        return ResponseEntity.ok(
                ApiResponse.success("Utilisateurs par rôle", users));
    }

    /**
     * GET /api/admin/users/search?nom=alice
     * Search users by name (case-insensitive).
     */
    @GetMapping("/admin/users/search")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<UserResponse>>> searchByNom(
            @RequestParam String nom) {

        List<UserResponse> results = userService.searchByNom(nom);
        log.info("Recherche d'utilisateurs par nom '{}' : {} résultats", nom, results.size());
        return ResponseEntity.ok(
                ApiResponse.success("Résultats de la recherche", results));
    }
}
