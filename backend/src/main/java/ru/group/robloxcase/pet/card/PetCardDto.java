package ru.group.robloxcase.petcard;

import java.util.List;

public record PetCardDto(Long petId, List<Long> propertyIds) {
}
