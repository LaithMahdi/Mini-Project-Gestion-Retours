package com.example.gestionretours.services;

import com.example.gestionretours.config.PaginatedResponse;
import com.example.gestionretours.controllers.UserFilter;
import com.example.gestionretours.dto.AdminCreateUserRequest;
import com.example.gestionretours.dto.UpdateUserRequest;
import com.example.gestionretours.dto.UserResponse;
import java.util.List;
import java.util.UUID;

public interface UserService {
    UserResponse adminCreateUser(AdminCreateUserRequest request);
    List<UserResponse> getAllUsers();
    PaginatedResponse<UserResponse> getAllUsersWithFilterAndPagination(UserFilter filter, int page, int size);
    UserResponse getUserById(UUID id);
    UserResponse updateUser(UUID id, UpdateUserRequest request);
    void deleteUser(UUID id);
    UserResponse getMyProfile(String email);
}
