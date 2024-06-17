package com.chupachups.roblox_case.repositories;

import com.chupachups.roblox_case.models.RoleEntity;
import com.chupachups.roblox_case.models.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
    Optional<RoleEntity> findByName(Role name);
}
