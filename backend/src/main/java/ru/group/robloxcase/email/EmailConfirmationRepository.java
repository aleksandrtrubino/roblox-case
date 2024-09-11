package ru.group.robloxcase.email;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmailConfirmationRepository extends JpaRepository<EmailConfirmation, Long> {
    Optional<EmailConfirmation> findByEmail(String email);
    Optional<EmailConfirmation> findByUserId(Long userId);
    void deleteByUserId(Long userId);
}
