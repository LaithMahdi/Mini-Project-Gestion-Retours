package com.example.gestionretours.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EdgeInfo {
    private boolean hasNext;
    private boolean hasPrevious;
    private long totalItems;
    private int currentPage;
}

