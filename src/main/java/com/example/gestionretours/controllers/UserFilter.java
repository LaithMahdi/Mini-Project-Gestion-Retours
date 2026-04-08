package com.example.gestionretours.controllers;

import com.example.gestionretours.entites.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserFilter {
    private String nom;
    private String email;
    private Role role;
    private Boolean enabled;
}

