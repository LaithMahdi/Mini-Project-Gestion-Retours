package com.example.gestionretours.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiException extends RuntimeException {

    private final HttpStatus status;
    private final String errorCode;

    public ApiException(String message) {
        super(message);
        this.status = HttpStatus.INTERNAL_SERVER_ERROR;
        this.errorCode = "INTERNAL_ERROR";
    }

    public ApiException(String message, HttpStatus status) {
        super(message);
        this.status = status;
        this.errorCode = status.name();
    }

    public ApiException(String message, HttpStatus status, String errorCode) {
        super(message);
        this.status = status;
        this.errorCode = errorCode;
    }

    public ApiException(String message, Throwable cause) {
        super(message, cause);
        this.status = HttpStatus.INTERNAL_SERVER_ERROR;
        this.errorCode = "INTERNAL_ERROR";
    }

    // Factory methods for common exceptions
    public static ApiException notFound(String resource, Long id) {
        return new ApiException(
                String.format("%s not found with id: %d", resource, id),
                HttpStatus.NOT_FOUND,
                "RESOURCE_NOT_FOUND"
        );
    }

    public static ApiException notFound(String resource, String field, String value) {
        return new ApiException(
                String.format("%s not found with %s: %s", resource, field, value),
                HttpStatus.NOT_FOUND,
                "RESOURCE_NOT_FOUND"
        );
    }

    public static ApiException badRequest(String message) {
        return new ApiException(message, HttpStatus.BAD_REQUEST, "BAD_REQUEST");
    }

    public static ApiException validationFailed(String message) {
        return new ApiException(message, HttpStatus.BAD_REQUEST, "VALIDATION_FAILED");
    }

    public static ApiException duplicateResource(String resource, String field, String value) {
        return new ApiException(
                String.format("%s already exists with %s: %s", resource, field, value),
                HttpStatus.CONFLICT,
                "DUPLICATE_RESOURCE"
        );
    }

    public static ApiException unauthorized(String message) {
        return new ApiException(message, HttpStatus.UNAUTHORIZED, "UNAUTHORIZED");
    }

    public static ApiException forbidden(String message) {
        return new ApiException(message, HttpStatus.FORBIDDEN, "FORBIDDEN");
    }
}
