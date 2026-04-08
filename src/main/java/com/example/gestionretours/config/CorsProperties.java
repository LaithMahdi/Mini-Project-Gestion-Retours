package com.example.gestionretours.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "app.cors")
public class CorsProperties {
    private String allowedOrigins;
    private String allowedMethods;
    private String allowedHeaders;
    private String exposedHeaders;
    private boolean allowCredentials;
    private long maxAge;

    public String[] getAllowedOriginsArray() {
        return allowedOrigins.split(",");
    }

    public String[] getAllowedMethodsArray() {
        return allowedMethods.split(",");
    }

    public String[] getAllowedHeadersArray() {
        return allowedHeaders.equals("*") ? new String[]{"*"} : allowedHeaders.split(",");
    }

    public String[] getExposedHeadersArray() {
        return exposedHeaders.split(",");
    }
}

