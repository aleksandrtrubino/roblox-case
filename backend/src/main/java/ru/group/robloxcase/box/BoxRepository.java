package ru.group.robloxcase.box;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface BoxRepository extends JpaRepository<Box, Long>, JpaSpecificationExecutor<Box> {
}
