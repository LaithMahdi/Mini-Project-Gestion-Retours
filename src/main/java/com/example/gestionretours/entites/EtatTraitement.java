package com.example.gestionretours.entites;

public enum EtatTraitement {
    EN_ATTENTE("En attente"),
    APPROUVE("Approuvé"),
    REFUSE("Refusé"),
    REMBOURSE("Remboursé"),
    ECHANGE("Échangé"),
    EN_COURS_VERIFICATION("En cours de vérification"),
    REMBOURSEMENT_EN_ATTENTE("Remboursement en attente"),
    PRODUIT_RECU("Produit reçu");

    private final String displayName;

    EtatTraitement(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}