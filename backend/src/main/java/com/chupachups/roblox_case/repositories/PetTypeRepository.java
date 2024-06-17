package com.chupachups.roblox_case.repositories;

import com.chupachups.roblox_case.models.PetTypeEntity;
import com.chupachups.roblox_case.models.enums.PetType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface PetTypeRepository extends JpaRepository<PetTypeEntity, Long> {

    Optional<PetTypeEntity> findByType(PetType type);
}
