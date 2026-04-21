package com.example.petadoption.repository;

import com.example.petadoption.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void addUser(User user) {

        String sql = "INSERT INTO users(name, email, password, address, city, state, zip_code, contact_number, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        jdbcTemplate.update(sql,
            user.getName(),
            user.getEmail(),
            user.getPassword(),
            user.getAddress(),
            user.getCity(),
            user.getState(),
            user.getZipCode(),
            user.getContactNumber(),
            user.getRole()   
        );
    }
   

    public List<Map<String, Object>> login(String email, String password) {
        String sql = "SELECT * FROM users WHERE email=? AND password=?";
        return jdbcTemplate.queryForList(sql, email, password);
    }
}