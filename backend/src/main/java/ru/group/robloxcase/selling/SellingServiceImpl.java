package ru.group.robloxcase.selling;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.group.robloxcase.balance.Balance;
import ru.group.robloxcase.balance.BalanceRepository;
import ru.group.robloxcase.balance.BalanceService;
import ru.group.robloxcase.exception.NotFoundException;
import ru.group.robloxcase.inventory.Inventory;
import ru.group.robloxcase.inventory.InventoryRepository;
import ru.group.robloxcase.inventory.item.InventoryItem;

@Service
public class SellingServiceImpl implements SellingService{

    private final BalanceRepository balanceRepository;
    private final InventoryRepository inventoryRepository;

    public SellingServiceImpl(BalanceRepository balanceRepository, InventoryRepository inventoryRepository) {
        this.balanceRepository = balanceRepository;
        this.inventoryRepository = inventoryRepository;
    }

    @Transactional
    @Override
    public void sell(Long inventoryItemId, Long userId) {
        Balance balance = balanceRepository.findByUserId(userId)
                .orElseThrow(()->new NotFoundException(String.format("Balance for user with ID %1$s not found",userId)));
        Inventory inventory = inventoryRepository.findByUserId(userId)
                .orElseThrow(()->new NotFoundException(String.format("Inventory for user with ID %1$s not found",userId)));
        for (InventoryItem item : inventory.getItems()) {
            if (item.getId().equals(inventoryItemId)) {
                int currentBalance = balance.getBalance();
                int price = item.getPetCard().getPrice();
                balance.setBalance(currentBalance + price);
                inventory.getItems().remove(item);
                item.setInventory(null);
                balanceRepository.save(balance);
                inventoryRepository.save(inventory);
                return;
            }
        }
        throw new NotFoundException("InventoryItem not found in Inventory");
    }
}
