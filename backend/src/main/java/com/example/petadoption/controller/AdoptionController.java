package com.example.petadoption.controller;

import com.example.petadoption.repository.AdoptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/adoptions")
@CrossOrigin(origins="*")
public class AdoptionController {

    @Autowired
    private AdoptionRepository repo;

    @PostMapping
    public String adopt(@RequestBody Map<String,Integer> data) {

        repo.createRequest(
            data.get("userId"),
            data.get("petId")
        );

        return "Sent";
    }

    @GetMapping("/status/{userId}/{petId}")
    public String status(@PathVariable int userId,
                         @PathVariable int petId) {

        return repo.getStatus(userId, petId);
    }

    @DeleteMapping("/{userId}/{petId}")
    public String revoke(@PathVariable int userId,
                         @PathVariable int petId) {

        repo.revokeRequest(userId, petId);
        return "Revoked";
    }

    @GetMapping
    public List<Map<String,Object>> all() {
        return repo.getAllRequests();
    }

    @PutMapping("/{id}/{status}")
    public String update(@PathVariable int id,
                         @PathVariable String status) {

        repo.updateStatus(id,status);
        return "Updated";
    }
    @GetMapping("/pet-status/{petId}")
    public String petStatus(@PathVariable int petId) {
        return repo.getPetGlobalStatus(petId);
    }
}