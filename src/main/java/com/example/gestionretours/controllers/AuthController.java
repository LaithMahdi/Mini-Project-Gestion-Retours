package com.example.gestionretours.controllers;

import com.example.gestionretours.config.ApiResponse;
import com.example.gestionretours.dto.request.LoginRequest;
import com.example.gestionretours.dto.request.RegisterRequest;
import com.example.gestionretours.dto.response.AuthResponse;
import com.example.gestionretours.services.AuthService;
import io.swagger.v3.oas.annotations.tags.Tag;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Authentication API", description = "API for user authentication")
public class AuthController {

    private final AuthService authService;

    /**
     * POST /auth/register
     * Public — anyone can create an account (role = USER)
     *
     * Body: { "nom": "Alice", "email": "alice@mail.com", "password": "secret123" }
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(
            @Valid @RequestBody RegisterRequest request) {

        AuthResponse response = authService.register(request);
        log.info("Nouvel utilisateur enregistré : {}", request.getEmail());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Compte créé avec succès", response));
    }

    /**
     * POST /auth/login
     * Public — returns JWT on success
     *
     * Body: { "email": "alice@mail.com", "password": "secret123" }
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request) {

        AuthResponse response = authService.login(request);
        log.info("Utilisateur connecté avec succès : {}", request.getEmail());
        return ResponseEntity
                .ok(ApiResponse.success("Connexion réussie", response));
    }
}
