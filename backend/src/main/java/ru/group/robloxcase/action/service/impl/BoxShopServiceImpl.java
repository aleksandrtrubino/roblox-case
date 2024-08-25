package ru.group.robloxcase.action.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.group.robloxcase.action.service.BoxShopService;
import ru.group.robloxcase.balance.Balance;
import ru.group.robloxcase.balance.BalanceRepository;
import ru.group.robloxcase.balance.BalanceService;
import ru.group.robloxcase.box.Box;
import ru.group.robloxcase.box.BoxRepository;
import ru.group.robloxcase.exception.NotFoundException;
import ru.group.robloxcase.inventory.Inventory;
import ru.group.robloxcase.inventory.InventoryRepository;

@Service
public class BoxShopServiceImpl implements BoxShopService {

    private final BoxRepository boxRepository;
    private final BalanceRepository balanceRepository;
    private final InventoryRepository inventoryRepository;

    public BoxShopServiceImpl(BoxRepository boxRepository, BalanceRepository balanceRepository, InventoryRepository inventoryRepository) {
        this.boxRepository = boxRepository;
        this.balanceRepository = balanceRepository;
        this.inventoryRepository = inventoryRepository;
    }

    @Transactional
    @Override
    public void buy(Long userId, Long boxId) {
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
        inventory.getBoxes().add(box);
        balanceRepository.save(balance);
        inventoryRepository.save(inventory);
    }
}
