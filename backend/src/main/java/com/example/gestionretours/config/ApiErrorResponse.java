package com.example.gestionretours.config;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Standard error response payload")
public class ApiErrorResponse {

    @Schema(description = "Always false for error responses", example = "false")
    private boolean success;

    @Schema(description = "Human-readable error message", example = "Validation failed. Please check the required fields")
    private String message;

    @Schema(description = "Always null for errors", example = "null")
    private Object data;
}

