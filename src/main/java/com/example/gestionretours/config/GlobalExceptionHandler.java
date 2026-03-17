package com.example.gestionretours.config;

import com.example.gestionretours.exceptions.ApiException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleApiException(ApiException e) {
        Map<String, String> errorDetails = new HashMap<>();
        errorDetails.put("errorCode", e.getErrorCode());
        errorDetails.put("timestamp", String.valueOf(System.currentTimeMillis()));

        return ResponseEntity
                .status(e.getStatus())
                .body(ApiResponse.error(e.getMessage(), errorDetails));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        Map<String, String> errorDetails = new HashMap<>();
        errorDetails.put("errorCode", "VALIDATION_FAILED");
        errorDetails.put("timestamp", String.valueOf(System.currentTimeMillis()));
        errorDetails.putAll(errors);

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.error("Validation failed", errorDetails));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleGenericException(Exception e) {
        Map<String, String> errorDetails = new HashMap<>();
        errorDetails.put("errorCode", "INTERNAL_SERVER_ERROR");
        errorDetails.put("timestamp", String.valueOf(System.currentTimeMillis()));
        errorDetails.put("details", e.getMessage());

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("An unexpected error occurred", errorDetails));
    }
}