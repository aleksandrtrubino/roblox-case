package ru.group.robloxcase.pet.card;

import java.util.List;

public record PetCardDto(Long petId, List<Long> propertyIds) {
}
