package ru.group.robloxcase.action.service.impl;

import org.springframework.stereotype.Service;
import ru.group.robloxcase.action.dto.IdDto;
import ru.group.robloxcase.action.service.PetCardWheelService;
import ru.group.robloxcase.box.Box;
import ru.group.robloxcase.box.BoxRepository;
import ru.group.robloxcase.box.chance.Chance;
import ru.group.robloxcase.exception.NotFoundException;
import ru.group.robloxcase.inventory.Inventory;
import ru.group.robloxcase.inventory.InventoryRepository;
import ru.group.robloxcase.pet.card.PetCard;

import java.util.List;
import java.util.Random;

@Service
public class PetCardWheelServiceImpl implements PetCardWheelService {

    private final InventoryRepository inventoryRepository;
    private final BoxRepository boxRepository;

    public PetCardWheelServiceImpl(InventoryRepository inventoryRepository, BoxRepository boxRepository) {
        this.inventoryRepository = inventoryRepository;
        this.boxRepository = boxRepository;
    }

    @Override
    public PetCard spin(Long userId, Long boxId) {
        // Получаем инвентарь пользователя
        Inventory inventory = inventoryRepository.findByUserId(userId)
                .orElseThrow(() -> new NotFoundException(String.format("Inventory for user with id %s not found", userId)));

        // Находим Box по boxId в инвентаре пользователя
        Box box = inventory.getBoxes().stream()
                .filter(b -> b.getId().equals(boxId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(String.format("Box with id %s not found in inventory", boxId)));

        // Получаем случайный PetCard из Box
        List<PetCard> petCards = box.getChances().stream()
                .map(Chance::getPetCard)
                .toList();

        if (petCards.isEmpty()) {
            throw new NotFoundException(String.format("No PetCards available in Box with id %s", boxId));
        }
        //TODO: реализовать метод для возвращение питомца согласно вероятности
        PetCard selectedPetCard = petCards.get(new Random().nextInt(petCards.size()));

        inventory.getBoxes().remove(box);

        inventory.getPetCards().add(selectedPetCard);

        inventoryRepository.save(inventory);

        return selectedPetCard;
    }
}
