package com.example.gestionretours.services;

import com.example.gestionretours.dto.request.AdminCreateUserRequest;
import com.example.gestionretours.dto.request.UpdateUserRequest;
import com.example.gestionretours.dto.response.UserResponse;
import com.example.gestionretours.entites.Role;
import com.example.gestionretours.entites.User;
import com.example.gestionretours.exceptions.BusinessException;
import com.example.gestionretours.exceptions.ResourceNotFoundException;
import com.example.gestionretours.repos.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // ─── Spring Security: load user by email for JWT filter ──────────────────

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Aucun utilisateur avec l'email : " + email));
    }

    // ─── ADMIN: create user with explicit role ────────────────────────────────

    @Override
    public UserResponse adminCreateUser(AdminCreateUserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BusinessException(
                    "Un utilisateur avec l'email " + request.getEmail() + " existe déjà");
        }

        User user = User.builder()
                .nom(request.getNom())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .enabled(true)
                .build();

        User saved = userRepository.save(user);
        log.info("ADMIN a créé l'utilisateur : {} ({})", saved.getEmail(), saved.getRole());
        return UserResponse.from(saved);
    }

    // ─── ADMIN: read ──────────────────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserResponse::from)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserById(UUID id) {
        return UserResponse.from(findById(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> getUsersByRole(Role role) {
        return userRepository.findByRole(role)
                .stream()
                .map(UserResponse::from)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> searchByNom(String nom) {
        return userRepository.findByNomContainingIgnoreCase(nom)
                .stream()
                .map(UserResponse::from)
                .collect(Collectors.toList());
    }

    // ─── ADMIN: update ────────────────────────────────────────────────────────

    @Override
    public UserResponse updateUser(UUID id, UpdateUserRequest request) {
        User user = findById(id);

        // Email uniqueness check if it changed
        if (!user.getEmail().equals(request.getEmail())
                && userRepository.existsByEmail(request.getEmail())) {
            throw new BusinessException(
                    "L'email " + request.getEmail() + " est déjà utilisé par un autre compte");
        }

        user.setNom(request.getNom());
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());

        // Only update password if a new one was provided
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            log.info("Mot de passe mis à jour pour : {}", user.getEmail());
        }

        // Enable / disable account
        if (request.getEnabled() != null) {
            user.setEnabled(request.getEnabled());
        }

        User saved = userRepository.save(user);
        log.info("Utilisateur mis à jour : {} ({})", saved.getEmail(), saved.getRole());
        return UserResponse.from(saved);
    }

    // ─── ADMIN: delete ────────────────────────────────────────────────────────

    @Override
    public void deleteUser(UUID id) {
        User user = findById(id);
        userRepository.delete(user);
        log.info("Utilisateur supprimé : {}", user.getEmail());
    }

    // ─── Self-service ─────────────────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public UserResponse getMyProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Utilisateur introuvable : " + email));
        return UserResponse.from(user);
    }

    // ─── Private helper ───────────────────────────────────────────────────────

    private User findById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Utilisateur introuvable avec l'id : " + id));
    }
}
