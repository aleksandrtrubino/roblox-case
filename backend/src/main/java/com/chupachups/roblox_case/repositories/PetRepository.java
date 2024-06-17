package com.chupachups.roblox_case.repositories;

import com.chupachups.roblox_case.models.PetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetRepository extends JpaRepository<PetEntity, Long> {
}
