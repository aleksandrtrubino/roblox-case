package ru.group.robloxcase.action.service;

import ru.group.robloxcase.pet.card.PetCard;

public interface BoxRouletteService {
    PetCard spin(Long userId, Long boxId);
}
