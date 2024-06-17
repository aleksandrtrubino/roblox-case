package com.chupachups.roblox_case.repositories;

import com.chupachups.roblox_case.models.PetRarityEntity;
import com.chupachups.roblox_case.models.enums.PetRarity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PetRarityRepository extends JpaRepository<PetRarityEntity, Long> {

    Optional<PetRarityEntity> findByRarity(PetRarity rarity);
}
