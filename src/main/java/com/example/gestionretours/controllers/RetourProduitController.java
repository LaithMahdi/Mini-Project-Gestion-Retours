package com.example.gestionretours.controllers;

import com.example.gestionretours.entites.RetourProduit;
import com.example.gestionretours.services.RetourProduitService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/retours")
@RequiredArgsConstructor
public class RetourProduitController {

    private final RetourProduitService service;

    @PostMapping("/create")
    public RetourProduit create(@RequestBody RetourProduit retour) {
        return service.save(retour);
    }

    @GetMapping
    public List<RetourProduit> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public RetourProduit getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}