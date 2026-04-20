package com.example.gestionretours.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaginatedApiResponse<T> {
    private boolean success;
    private String message;
    private List<T> data;
    private EdgeInfo edgeInfo;

    public static <T> PaginatedApiResponse<T> success(String message, List<T> data, EdgeInfo edgeInfo) {
        return new PaginatedApiResponse<>(true, message, data, edgeInfo);
    }

    public static <T> PaginatedApiResponse<T> error(String message) {
        return new PaginatedApiResponse<>(false, message, null, null);
    }
}

