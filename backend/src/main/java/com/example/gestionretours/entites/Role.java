package com.example.gestionretours.entites;

public enum Role {
    ADMIN("Administrateur"),
    USER("Utilisateur"),
    MANAGER("Gestionnaire");

    private final String displayName;

    Role(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
