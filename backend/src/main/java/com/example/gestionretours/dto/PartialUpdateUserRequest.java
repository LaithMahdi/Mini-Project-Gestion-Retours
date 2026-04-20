package com.example.gestionretours.dto;

import com.example.gestionretours.entites.Role;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PartialUpdateUserRequest {
    private String nom;
    @Email(message = "Format email invalide")
    private String email;
    private Role role;
    private Boolean enabled;
}

