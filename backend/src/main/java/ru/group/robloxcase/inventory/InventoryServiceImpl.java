package ru.group.robloxcase.inventory;

import org.springframework.stereotype.Service;
import ru.group.robloxcase.box.Box;
import ru.group.robloxcase.exception.NotFoundException;
import ru.group.robloxcase.pet.card.PetCard;

import java.util.List;

@Service
public class InventoryServiceImpl implements InventoryService{

    private final InventoryRepository inventoryRepository;

    public InventoryServiceImpl(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public Inventory findByUserId(Long userId) {
        return inventoryRepository.findByUserId(userId)
                .orElseThrow(()->new NotFoundException(String.format("Inventory for user with ID %1$s not found",userId)));
    }
}
