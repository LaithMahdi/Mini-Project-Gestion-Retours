package com.example.gestionretours.config;

import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@ApiResponses(value = {
        @ApiResponse(
                responseCode = "400",
                description = "Bad Request - Invalid return request payload",
                content = @Content(
                        schema = @Schema(implementation = ApiErrorResponse.class),
                        examples = @ExampleObject(value = "{\"success\":false,\"message\":\"Validation failed. Please check the required fields\",\"data\":null}")
                )
        ),
        @ApiResponse(
                responseCode = "401",
                description = "Unauthorized - Missing or invalid JWT token",
                content = @Content(
                        schema = @Schema(implementation = ApiErrorResponse.class),
                        examples = @ExampleObject(value = "{\"success\":false,\"message\":\"Unauthorized\",\"data\":null}")
                )
        ),
        @ApiResponse(
                responseCode = "403",
                description = "Forbidden - User role cannot access return endpoint",
                content = @Content(
                        schema = @Schema(implementation = ApiErrorResponse.class),
                        examples = @ExampleObject(value = "{\"success\":false,\"message\":\"Access denied\",\"data\":null}")
                )
        ),
        @ApiResponse(
                responseCode = "500",
                description = "Internal Server Error",
                content = @Content(
                        schema = @Schema(implementation = ApiErrorResponse.class),
                        examples = @ExampleObject(value = "{\"success\":false,\"message\":\"An unexpected error occurred. Please try again later\",\"data\":null}")
                )
        )
})
public @interface RetourApiErrorResponses {
}

