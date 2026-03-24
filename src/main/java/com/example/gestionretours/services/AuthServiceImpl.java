package com.example.gestionretours.services;

import com.example.gestionretours.dto.request.LoginRequest;
import com.example.gestionretours.dto.request.RegisterRequest;
import com.example.gestionretours.dto.response.AuthResponse;
import com.example.gestionretours.dto.response.UserResponse;
import com.example.gestionretours.entites.Role;
import com.example.gestionretours.entites.User;
import com.example.gestionretours.exceptions.BusinessException;
import com.example.gestionretours.repos.UserRepository;
import com.example.gestionretours.security.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    // ─── Register (public, role = USER) ──────────────────────────────────────

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BusinessException(
                    "Un compte avec l'email " + request.getEmail() + " existe déjà");
        }

        User user = User.builder()
                .nom(request.getNom())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .enabled(true)
                .build();

        userRepository.save(user);
        log.info("Nouveau compte créé : {} (USER)", user.getEmail());

        String token = jwtUtil.generateToken(user);
        return buildAuthResponse(token, user);
    }

    // ─── Login ────────────────────────────────────────────────────────────────

    @Override
    public AuthResponse login(LoginRequest request) {
        // throws BadCredentialsException if wrong email/password (caught by GlobalExceptionHandler)
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BusinessException("Utilisateur introuvable"));

        if (!user.isEnabled()) {
            throw new BusinessException("Ce compte est désactivé. Contactez un administrateur.");
        }

        log.info("Connexion réussie : {} ({})", user.getEmail(), user.getRole());
        String token = jwtUtil.generateToken(user);
        return buildAuthResponse(token, user);
    }

    // ─── Helper ───────────────────────────────────────────────────────────────

    private AuthResponse buildAuthResponse(String token, User user) {
        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .user(UserResponse.from(user))
                .build();
    }
}
