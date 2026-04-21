package com.example.petadoption.controller;

import com.example.petadoption.model.User;
import com.example.petadoption.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserRepository repo;

    @PostMapping
    public String addUser(@RequestBody User user) {
        System.out.println(user.getName()); // debug
        repo.addUser(user);
        return "User registered!";
    }
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User user) {

        // 🔥 DEBUG PRINTS
        System.out.println("Email from frontend: " + user.getEmail());
        System.out.println("Password from frontend: " + user.getPassword());

        List<Map<String, Object>> result =
                repo.login(user.getEmail(), user.getPassword());

        System.out.println("DB Result: " + result); // 🔥 VERY IMPORTANT

        if (result.isEmpty()) {
            return Map.of("message", "Invalid credentials");
        }

        return result.get(0);
    }
    @PostMapping("/raw")
    public String test(@RequestBody String data) {
        return data;
    }
}