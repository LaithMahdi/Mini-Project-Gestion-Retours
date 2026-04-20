package com.example.gestionretours.services;


import com.example.gestionretours.dto.AuthResponse;
import com.example.gestionretours.dto.LoginRequest;
import com.example.gestionretours.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
