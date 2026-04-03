package com.example.gestionretours.dto;

import com.example.gestionretours.entites.Role;
import com.example.gestionretours.entites.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private UUID id;
    private String nom;
    private String email;
    private Role role;
    private String roleDisplayName;
    private boolean enabled;

    public static UserResponse from(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .nom(user.getNom())
                .email(user.getEmail())
                .role(user.getRole())
                .roleDisplayName(user.getRole().getDisplayName())
                .enabled(user.isEnabled())
                .build();
    }
}
