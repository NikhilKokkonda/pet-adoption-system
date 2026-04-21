package com.example.petadoption.repository;

import com.example.petadoption.model.Pet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PetRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void addPet(Pet pet) {
        String sql = "insert into pets(name, breed, age, description) values(?,?,?,?)";
        jdbcTemplate.update(sql,
                pet.getName(),
                pet.getBreed(),
                pet.getAge(),
                pet.getDescription());
    }

    public List<Pet> getAllPets() {
        String sql = "select * from pets";

        return jdbcTemplate.query(sql, (rs, rowNum) ->
                new Pet(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("breed"),
                        rs.getInt("age"),
                        rs.getString("description")
                )
        );
    }

    public Pet getPetById(int id) {

        String sql = "select * from pets where id=?";

        return jdbcTemplate.queryForObject(
            sql,
            (rs, rowNum) -> new Pet(
                rs.getInt("id"),
                rs.getString("name"),
                rs.getString("breed"),
                rs.getInt("age"),
                rs.getString("description")
            ),
            id
        );
    }

    public void updatePet(int id, Pet pet) {
        String sql = "update pets set name=?, breed=?, age=?, description=? where id=?";
        jdbcTemplate.update(sql,
                pet.getName(),
                pet.getBreed(),
                pet.getAge(),
                pet.getDescription(),
                id);
    }

    public void deletePet(int id) {
        String sql = "delete from pets where id=?";
        jdbcTemplate.update(sql, id);
    }
    public List<Pet> getAllPetsForAdmin() {

        String sql = "select * from pets";

        return jdbcTemplate.query(sql, (rs,rowNum) ->
            new Pet(
                rs.getInt("id"),
                rs.getString("name"),
                rs.getString("breed"),
                rs.getInt("age"),
                rs.getString("description")
            )
        );
    }
}