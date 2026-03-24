package com.example.gestionretours.services;

import com.example.gestionretours.dto.request.LoginRequest;
import com.example.gestionretours.dto.request.RegisterRequest;
import com.example.gestionretours.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
