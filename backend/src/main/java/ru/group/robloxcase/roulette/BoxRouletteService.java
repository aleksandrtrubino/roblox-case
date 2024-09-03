package ru.group.robloxcase.roulette;

import ru.group.robloxcase.pet.card.PetCard;

public interface BoxRouletteService {
    PetCard spin(Long userId, Long boxId);
    String testSpin(Long boxId, int spinCount);
}
