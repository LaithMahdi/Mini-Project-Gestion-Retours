package com.example.gestionretours.services;

import com.example.gestionretours.config.EdgeInfo;
import com.example.gestionretours.config.PaginatedResponse;
import com.example.gestionretours.controllers.UserFilter;
import com.example.gestionretours.dto.AdminCreateUserRequest;
import com.example.gestionretours.dto.UpdateUserRequest;
import com.example.gestionretours.dto.UserResponse;
import com.example.gestionretours.entites.User;
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

    private final UserRepository  userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Aucun utilisateur avec l'email : " + email));
    }

    @Override
    public UserResponse adminCreateUser(AdminCreateUserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException(
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
    public PaginatedResponse<UserResponse> getAllUsersWithFilterAndPagination(UserFilter filter, int page, int size) {
        List<User> allUsers = userRepository.findAll();
        List<User> filteredUsers = allUsers.stream()
                .filter(user -> filterByNom(user, filter.getNom()))
                .filter(user -> filterByEmail(user, filter.getEmail()))
                .filter(user -> filterByRole(user, filter.getRole()))
                .filter(user -> filterByEnabled(user, filter.getEnabled()))
                .collect(Collectors.toList());

        // Calculate pagination
        long totalItems = filteredUsers.size();
        int totalPages = (int) Math.ceil((double) totalItems / size);

        // Validate page number
        if (page < 1) page = 1;
        if (page > totalPages && totalPages > 0) page = totalPages;

        // Get paginated data
        int startIndex = (page - 1) * size;
        int endIndex = Math.min(startIndex + size, (int) totalItems);
        List<UserResponse> pageData = filteredUsers.subList(startIndex, endIndex)
                .stream()
                .map(UserResponse::from)
                .collect(Collectors.toList());

        // Create edge info
        EdgeInfo edgeInfo = new EdgeInfo(
                page < totalPages,
                page > 1,
                totalItems,
                page
        );

        return new PaginatedResponse<>(pageData, edgeInfo);
    }

    private boolean filterByNom(User user, String nom) {
        if (nom == null || nom.isBlank()) {
            return true;
        }
        return user.getNom().toLowerCase().contains(nom.toLowerCase());
    }

    private boolean filterByEmail(User user, String email) {
        if (email == null || email.isBlank()) {
            return true;
        }
        return user.getEmail().toLowerCase().contains(email.toLowerCase());
    }

    private boolean filterByRole(User user, Object role) {
        if (role == null) {
            return true;
        }
        return user.getRole().equals(role);
    }

    private boolean filterByEnabled(User user, Boolean enabled) {
        if (enabled == null) {
            return true;
        }
        return user.isEnabled() == enabled;
    }

    @Override
    public UserResponse updateUser(UUID id, UpdateUserRequest request) {
        User user = findById(id);

        // Email uniqueness check if it changed
        if (!user.getEmail().equals(request.getEmail())
                && userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException(
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

    @Override
    @Transactional(readOnly = true)
    public UserResponse getMyProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException(
                        "Utilisateur introuvable : " + email));
        return UserResponse.from(user);
    }

    private User findById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Utilisateur introuvable avec l'id : " + id));
    }
}
