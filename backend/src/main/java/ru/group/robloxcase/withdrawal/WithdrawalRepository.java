package ru.group.robloxcase.withdrawal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface WithdrawalRepository extends JpaRepository<Withdrawal, Long>, JpaSpecificationExecutor<Withdrawal> {
    List<Withdrawal> findByUserId(Long userId);
    Optional<Withdrawal> findByCreatedAt(LocalDateTime createdAt);
}
