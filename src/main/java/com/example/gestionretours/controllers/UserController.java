package com.example.gestionretours.controllers;

import com.example.gestionretours.config.ApiResponse;
import com.example.gestionretours.config.UserApiErrorResponses;
import com.example.gestionretours.config.PaginatedApiResponse;
import com.example.gestionretours.config.PaginatedResponse;
import com.example.gestionretours.dto.AdminCreateUserRequest;
import com.example.gestionretours.dto.UpdateUserRequest;
import com.example.gestionretours.dto.PartialUpdateUserRequest;
import com.example.gestionretours.dto.UserResponse;
import com.example.gestionretours.dto.UserSimpleResponse;
import com.example.gestionretours.entites.Role;
import com.example.gestionretours.services.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
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
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "User API", description = "API for managing users")
@SecurityRequirement(name = "bearerAuth")
@UserApiErrorResponses
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getMyProfile(
            @AuthenticationPrincipal UserDetails userDetails) {
        UserResponse profile = userService.getMyProfile(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Profil récupéré", profile));
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<List<UserSimpleResponse>>> getAllUsersSimple() {
        List<UserSimpleResponse> users = userService.getAllUsersSimple();
        return ResponseEntity.ok(ApiResponse.success("Liste de tous les utilisateurs", users));
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserResponse>> adminCreateUser(
            @Valid @RequestBody AdminCreateUserRequest request) {
        UserResponse created = userService.adminCreateUser(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Utilisateur créé par l'administrateur", created));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PaginatedApiResponse<UserResponse>> getAllUsers(
            @RequestParam(required = false) String nom,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) Role role,
            @RequestParam(required = false) Boolean enabled,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        UserFilter filter = new UserFilter(nom, email, role, enabled);
        PaginatedResponse<UserResponse> response = userService.getAllUsersWithFilterAndPagination(filter, page, size);
        PaginatedApiResponse<UserResponse> paginatedApiResponse = new PaginatedApiResponse<>(
                true,
                "Liste des utilisateurs",
                response.getData(),
                response.getEdgeInfo()
        );
        return ResponseEntity.ok(paginatedApiResponse);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable UUID id) {
        return ResponseEntity.ok(
                ApiResponse.success("Utilisateur trouvé", userService.getUserById(id)));
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserResponse>> updateUser(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateUserRequest request) {
        UserResponse updated = userService.updateUser(id, request);
        return ResponseEntity.ok(ApiResponse.success("Utilisateur mis à jour", updated));
    }

    @PatchMapping("/patch/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserResponse>> partialUpdateUser(
            @PathVariable UUID id,
            @RequestBody PartialUpdateUserRequest request) {
        UserResponse updated = userService.partialUpdateUser(id, request);
        return ResponseEntity.ok(ApiResponse.success("Utilisateur partiellement mis à jour", updated));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable UUID id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(ApiResponse.success("Utilisateur supprimé", null));
    }
}
