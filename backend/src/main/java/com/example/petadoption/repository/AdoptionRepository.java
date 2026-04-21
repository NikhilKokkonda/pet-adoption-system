package com.example.petadoption.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class AdoptionRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void createRequest(int userId, int petId) {
        String sql = "insert into adoption_requests(user_id, pet_id, status) values(?,?,?)";
        jdbcTemplate.update(sql, userId, petId, "PENDING");
    }

    public String getStatus(int userId, int petId) {

        String sql =
        "select status from adoption_requests " +
        "where user_id=? and pet_id=? " +
        "order by id desc limit 1";

        List<String> list =
        jdbcTemplate.queryForList(
            sql,
            String.class,
            userId,
            petId
        );

        if (list.size() == 0) {
            return "NONE";
        }

        return list.get(0);
    }

    public void revokeRequest(int userId, int petId) {
        String sql =
        "delete from adoption_requests where user_id=? and pet_id=?";
        jdbcTemplate.update(sql, userId, petId);
    }

    public List<Map<String,Object>> getAllRequests() {

        String sql =
        "select id, " +
        "user_id as userId, " +
        "pet_id as petId, " +
        "status " +
        "from adoption_requests";

        return jdbcTemplate.queryForList(sql);
    }

    public void updateStatus(int id, String status) {

        jdbcTemplate.update(
            "update adoption_requests set status=? where id=?",
            status, id
        );

        if(status.equals("APPROVED")) {

            Integer petId =
            jdbcTemplate.queryForObject(
                "select pet_id from adoption_requests where id=?",
                Integer.class,
                id
            );

            jdbcTemplate.update(
                "update pets set status='ADOPTED' where id=?",
                petId
            );
        }
    }
    public String getPetGlobalStatus(int petId) {

        String sql =
        "select status from adoption_requests " +
        "where pet_id=? " +
        "order by id desc limit 1";

        List<String> list =
        jdbcTemplate.queryForList(
            sql,
            String.class,
            petId
        );

        if(list.size()==0){
            return "NONE";
        }

        return list.get(0);
    }
}