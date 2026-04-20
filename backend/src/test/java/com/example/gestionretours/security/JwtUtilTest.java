package com.example.gestionretours.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class JwtUtilTest {

    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil();
        ReflectionTestUtils.setField(jwtUtil, "secret", "12345678901234567890123456789012");
        ReflectionTestUtils.setField(jwtUtil, "expiration", 3600000L);
    }

    @Test
    void shouldGenerateAndValidateToken() {
        UserDetails user = User.withUsername("admin@delivery.com")
                .password("ignored")
                .authorities("ROLE_ADMIN")
                .build();

        String token = jwtUtil.generateToken(user);

        assertEquals("admin@delivery.com", jwtUtil.extractUsername(token));
        assertEquals("ROLE_ADMIN", jwtUtil.extractRole(token));
        assertTrue(jwtUtil.isTokenValid(token, user));
    }

    @Test
    void shouldRejectTokenForDifferentUser() {
        UserDetails tokenOwner = User.withUsername("owner@delivery.com")
                .password("ignored")
                .authorities("ROLE_USER")
                .build();

        UserDetails otherUser = User.withUsername("other@delivery.com")
                .password("ignored")
                .authorities("ROLE_USER")
                .build();

        String token = jwtUtil.generateToken(tokenOwner);

        assertFalse(jwtUtil.isTokenValid(token, otherUser));
    }
}
