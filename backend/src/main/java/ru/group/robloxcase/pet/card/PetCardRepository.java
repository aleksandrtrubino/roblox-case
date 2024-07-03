package ru.group.robloxcase.petcard;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PetCardRepository extends JpaRepository<PetCard, Long>, JpaSpecificationExecutor<PetCard> {
}
