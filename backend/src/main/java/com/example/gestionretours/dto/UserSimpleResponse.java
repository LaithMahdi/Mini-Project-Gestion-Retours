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
public class UserSimpleResponse {
    private UUID id;
    private String nom;
    private Role role;

    public static UserSimpleResponse from(User user) {
        return UserSimpleResponse.builder()
                .id(user.getId())
                .nom(user.getNom())
                .role(user.getRole())
                .build();
    }
}

