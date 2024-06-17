package com.chupachups.roblox_case.repositories;

import com.chupachups.roblox_case.models.ContainerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContainerRepository extends JpaRepository<ContainerEntity, Long> {
    boolean existsByName(String name);
}
