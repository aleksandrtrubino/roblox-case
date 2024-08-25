package ru.group.robloxcase.action.service;

import ru.group.robloxcase.action.dto.IdDto;
import ru.group.robloxcase.pet.card.PetCard;

public interface PetCardWheelService {
    PetCard spin(Long userId, Long boxId);
}
