package com.example.gestionretours.config;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class CorsPropertiesTest {

    @Test
    void shouldSplitCorsPropertiesToArrays() {
        CorsProperties properties = new CorsProperties();
        properties.setAllowedOrigins("http://localhost:3000,http://localhost:5173");
        properties.setAllowedMethods("GET,POST,PUT");
        properties.setAllowedHeaders("Content-Type,Authorization");
        properties.setExposedHeaders("Content-Type,Authorization");

        assertArrayEquals(new String[]{"http://localhost:3000", "http://localhost:5173"}, properties.getAllowedOriginsArray());
        assertArrayEquals(new String[]{"GET", "POST", "PUT"}, properties.getAllowedMethodsArray());
        assertArrayEquals(new String[]{"Content-Type", "Authorization"}, properties.getAllowedHeadersArray());
        assertArrayEquals(new String[]{"Content-Type", "Authorization"}, properties.getExposedHeadersArray());
    }

    @Test
    void shouldSupportWildcardAllowedHeaders() {
        CorsProperties properties = new CorsProperties();
        properties.setAllowedHeaders("*");

        assertArrayEquals(new String[]{"*"}, properties.getAllowedHeadersArray());
    }
}
