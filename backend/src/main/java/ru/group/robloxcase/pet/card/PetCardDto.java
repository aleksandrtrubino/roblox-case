package ru.group.robloxcase.pet.card;

import java.util.List;

public record PetCardDto(Long petId, Integer price, List<Long> propertyIds) {
}
