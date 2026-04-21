package com.example.petadoption.controller;

import com.example.petadoption.model.Pet;
import com.example.petadoption.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pets")
@CrossOrigin(origins = "*")
public class PetController {

    @Autowired
    private PetRepository repo;

    @PostMapping
    public String addPet(@RequestBody Pet pet) {
        repo.addPet(pet);
        return "Pet added successfully";
    }

    @GetMapping
    public List<Pet> getAllPets() {
        return repo.getAllPets();
    }
    @GetMapping("/all")
    public List<Pet> getAllPetsForAdmin() {
        return repo.getAllPetsForAdmin();
    }

    @GetMapping("/{id}")
    public Pet getPetById(@PathVariable int id) {
        return repo.getPetById(id);
    }

    @PutMapping("/{id}")
    public String updatePet(@PathVariable int id, @RequestBody Pet pet) {
        repo.updatePet(id, pet);
        return "Pet updated";
    }

    @DeleteMapping("/{id}")
    public String deletePet(@PathVariable int id) {
        repo.deletePet(id);
        return "Pet deleted";
    }
}