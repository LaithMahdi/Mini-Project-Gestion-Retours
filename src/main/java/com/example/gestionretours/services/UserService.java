package com.example.gestionretours.services;

import com.example.gestionretours.controllers.UserFilter;
import com.example.gestionretours.dto.AdminCreateUserRequest;
import com.example.gestionretours.dto.UpdateUserRequest;
import com.example.gestionretours.dto.PartialUpdateUserRequest;
import com.example.gestionretours.dto.UserResponse;
import com.example.gestionretours.dto.UserSimpleResponse;
import com.example.gestionretours.config.PaginatedResponse;
import java.util.List;
import java.util.UUID;

public interface UserService {
    UserResponse adminCreateUser(AdminCreateUserRequest request);
    List<UserResponse> getAllUsers();
    List<UserResponse> getAllUsersWithFilter(UserFilter filter);
    PaginatedResponse<UserResponse> getAllUsersWithFilterAndPagination(UserFilter filter, int page, int size);
    PaginatedResponse<UserSimpleResponse> getAllUsersSimpleWithPagination(int page, int size);
    List<UserSimpleResponse> getAllUsersSimple();
    UserResponse getUserById(UUID id);
    UserResponse updateUser(UUID id, UpdateUserRequest request);
    UserResponse partialUpdateUser(UUID id, PartialUpdateUserRequest request);
    void deleteUser(UUID id);
    UserResponse getMyProfile(String email);
}
