package ru.group.robloxcase.action.service.impl;

import org.springframework.stereotype.Service;
import ru.group.robloxcase.action.service.PetCardWheelService;
import ru.group.robloxcase.balance.Balance;
import ru.group.robloxcase.balance.BalanceRepository;
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
    private final BalanceRepository balanceRepository;
    private final BoxRepository boxRepository;

    public PetCardWheelServiceImpl(InventoryRepository inventoryRepository, BalanceRepository balanceRepository, BoxRepository boxRepository) {
        this.inventoryRepository = inventoryRepository;
        this.balanceRepository = balanceRepository;
        this.boxRepository = boxRepository;
    }

    @Override
    public PetCard spin(Long userId, Long boxId) {

        Box box = boxRepository.findById(boxId)
                .orElseThrow(() -> new NotFoundException(String.format("Box with ID %d not found", boxId)));
        Balance balance = balanceRepository.findByUserId(userId)
                .orElseThrow(()->new NotFoundException(String.format("Balance for user with ID %1$s not found",userId)));
        Inventory inventory = inventoryRepository.findByUserId(userId)
                .orElseThrow(()->new NotFoundException(String.format("Inventory for user with ID %1$s not found",userId)));
        int price = box.getPrice();
        int currentBalance = balance.getBalance();
        if(currentBalance < price)
            throw new NotFoundException(String.format("Balance for user with ID %1$s doesn't have enough money",userId));
        balance.setBalance(currentBalance - price);

        List<PetCard> petCards = box.getChances().stream()
                .map(Chance::getPetCard)
                .toList();

        if (petCards.isEmpty()) {
            throw new NotFoundException(String.format("No Pet cards available in Box with id %s", boxId));
        }
        //TODO: реализовать метод для возвращение питомца согласно вероятности
        PetCard selectedPetCard = petCards.get(new Random().nextInt(petCards.size()));

        inventory.getPetCards().add(selectedPetCard);

        inventoryRepository.save(inventory);

        return selectedPetCard;
    }
}
