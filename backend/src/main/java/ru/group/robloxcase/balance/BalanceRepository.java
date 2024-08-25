package ru.group.robloxcase.balance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface BalanceRepository extends JpaRepository<Balance, Long>, JpaSpecificationExecutor<Balance> {

    Optional<Balance> findByUserId(Long userId);
}
