package ru.group.robloxcase.pet;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface PetRepository extends JpaRepository<Pet, Long>, JpaSpecificationExecutor<Pet> {
    boolean existsByName(String name);
}
