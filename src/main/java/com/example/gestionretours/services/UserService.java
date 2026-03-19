package com.example.gestionretours.services;

import com.example.gestionretours.dto.request.AdminCreateUserRequest;
import com.example.gestionretours.dto.request.UpdateUserRequest;
import com.example.gestionretours.dto.response.UserResponse;
import com.example.gestionretours.entites.Role;

import java.util.List;
import java.util.UUID;

public interface UserService {
    UserResponse adminCreateUser(AdminCreateUserRequest request);
    List<UserResponse> getAllUsers();
    UserResponse getUserById(UUID id);
    UserResponse updateUser(UUID id, UpdateUserRequest request);
    void deleteUser(UUID id);
    List<UserResponse> getUsersByRole(Role role);
    List<UserResponse> searchByNom(String nom);
    UserResponse getMyProfile(String email);
}