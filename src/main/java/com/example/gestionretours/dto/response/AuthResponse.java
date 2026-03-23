package com.example.gestionretours.dto.response;

import com.example.gestionretours.entites.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String type;          // "Bearer"
    private UserResponse user;
}
