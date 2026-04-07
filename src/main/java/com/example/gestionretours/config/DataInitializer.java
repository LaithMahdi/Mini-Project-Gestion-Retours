package com.example.gestionretours.config;

import com.example.gestionretours.entites.*;
import com.example.gestionretours.repos.NonConformiteRepository;
import com.example.gestionretours.repos.RetourProduitRepository;
import com.example.gestionretours.repos.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RetourProduitRepository retourProduitRepository;
    private final NonConformiteRepository nonConformiteRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        initializeDefaultAdmin();
        initializeSeedData();
    }

    private void initializeDefaultAdmin() {
        String adminEmail = "admin@delivery.com";
        
        if (userRepository.findByEmail(adminEmail).isPresent()) {
            log.info("✓ Default admin user already exists: {}", adminEmail);
            return;
        }

        User adminUser = User.builder()
                .nom("Administrator")
                .email(adminEmail)
                .password(passwordEncoder.encode("admin"))
                .role(Role.ADMIN)
                .enabled(true)
                .build();

        userRepository.save(adminUser);
        log.info("✓ Default admin user created: {} / admin", adminEmail);
    }

    private void initializeSeedData() {
        // Check if seed data already exists
        if (userRepository.count() > 1) {
            log.info("✓ Seed data already exists, skipping initialization");
            return;
        }

        log.info("🌱 Initializing seed data...");
        
        // Create 2 Manager users
        createManagers();
        
        // Create 2 Regular users
        createRegularUsers();
        
        // Create 50 Product Returns
        List<RetourProduit> retours = createProductReturns();
        
        // Create 50 Non-Conformities
        createNonConformities(retours);
        
        log.info("✅ Seed data initialization completed!");
    }

    private void createManagers() {
        String[] managers = {
            "manager1@delivery.com",
            "manager2@delivery.com"
        };

        for (int i = 0; i < managers.length; i++) {
            if (userRepository.findByEmail(managers[i]).isEmpty()) {
                User manager = User.builder()
                        .nom("Manager " + (i + 1))
                        .email(managers[i])
                        .password(passwordEncoder.encode("manager123"))
                        .role(Role.MANAGER)
                        .enabled(true)
                        .build();
                userRepository.save(manager);
                log.info("  ✓ Manager created: {}", managers[i]);
            }
        }
    }

    private void createRegularUsers() {
        String[] users = {
            "user1@delivery.com",
            "user2@delivery.com"
        };

        for (int i = 0; i < users.length; i++) {
            if (userRepository.findByEmail(users[i]).isEmpty()) {
                User user = User.builder()
                        .nom("User " + (i + 1))
                        .email(users[i])
                        .password(passwordEncoder.encode("user123"))
                        .role(Role.USER)
                        .enabled(true)
                        .build();
                userRepository.save(user);
                log.info("  ✓ User created: {}", users[i]);
            }
        }
    }

    private List<RetourProduit> createProductReturns() {
        List<RetourProduit> retours = new ArrayList<>();
        
        String[] products = {
            "Laptop Dell XPS", "iPhone 14 Pro", "Samsung Galaxy S23", "AirPods Pro",
            "iPad Air", "MacBook Pro", "Sony WH-1000XM5", "GoPro Hero 11",
            "DJI Mini 3 Pro", "Apple Watch Series 8", "Canon EOS R6", "Nikon Z6 II",
            "Sony A7IV", "Nintendo Switch", "PlayStation 5", "Xbox Series X"
        };

        String[] clients = {
            "Acme Corporation", "Tech Solutions Ltd", "Digital Innovations Inc",
            "Global Trading Co", "Premium Retail Group", "E-Commerce Plus",
            "Business Solutions", "Corporate Supplies", "Enterprise Tech",
            "Modern Systems"
        };

        String[] reasons = {
            "Défaut de fabrication détecté",
            "Produit endommagé lors de la livraison",
            "Non conforme aux spécifications",
            "Fonction ne fonctionne pas comme prévu",
            "Emballage endommagé",
            "Couleur ne correspond pas à la commande",
            "Taille incorrecte",
            "Produit défectueux sur réception",
            "Problème technique suite à installation",
            "Incompatibilité avec système existant"
        };

        EtatTraitement[] etats = EtatTraitement.values();
        
        for (int i = 1; i <= 50; i++) {
            RetourProduit retour = new RetourProduit();
            retour.setProduit(products[(i - 1) % products.length] + " #" + i);
            retour.setClient(clients[(i - 1) % clients.length]);
            retour.setRaison(reasons[(i - 1) % reasons.length]);
            retour.setEtatTraitement(etats[(i - 1) % etats.length]);
            retour.setDate(LocalDate.now().minusDays((i - 1) % 30)); // Spread dates over last 30 days
            retour.setNonConformites(new ArrayList<>());
            
            retours.add(retourProduitRepository.save(retour));
        }
        
        log.info("  ✓ {} Product Returns created", retours.size());
        return retours;
    }

    private void createNonConformities(List<RetourProduit> retours) {
        String[] descriptions = {
            "Composant électronique défectueux",
            "Boîtier endommagé lors du transport",
            "Câble d'alimentation détérioré",
            "Écran avec pixels défectueux",
            "Batterie ne charge pas correctement",
            "Ventilateur bruyant ou défectueux",
            "Connecteurs corrodés ou endommagés",
            "Logiciel préinstallé corrompu",
            "Clavier/Trackpad dysfonctionnel",
            "Port USB ne reconnaît pas les appareils",
            "Accumulation de poussière interne",
            "Rayures sur la surface",
            "Joint d'étanchéité compromis",
            "Performance inférieure aux spécifications",
            "Bruit anormal en fonctionnement"
        };

        Gravite[] gravites = Gravite.values();
        
        for (int i = 1; i <= 50; i++) {
            NonConformite nc = NonConformite.builder()
                    .description(descriptions[(i - 1) % descriptions.length])
                    .gravite(gravites[(i - 1) % gravites.length])
                    .produit(retours.get((i - 1) % retours.size()))
                    .build();
            
            nonConformiteRepository.save(nc);
        }
        
        log.info("  ✓ 50 Non-Conformities created");
    }
}

