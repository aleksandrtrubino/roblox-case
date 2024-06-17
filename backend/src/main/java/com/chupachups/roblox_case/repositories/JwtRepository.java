package com.chupachups.roblox_case.repositories;

import com.chupachups.roblox_case.models.JwtEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JwtRepository extends JpaRepository<JwtEntity,Long> {
    @Query("""
            from JwtEntity jwt
            join fetch jwt.user
            where jwt.user.id=:userId and jwt.isRevoked=false
    """)
   List<JwtEntity> findAllValidTokensByUser(@Param(value = "userId") long userId);

     List<JwtEntity> findByToken(String token);

}