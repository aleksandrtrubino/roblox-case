package ru.group.robloxcase.withdrawal;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.group.robloxcase.exception.NotFoundException;
import ru.group.robloxcase.inventory.Inventory;
import ru.group.robloxcase.inventory.InventoryRepository;
import ru.group.robloxcase.inventory.item.InventoryItem;
import ru.group.robloxcase.pet.card.PetCard;
import ru.group.robloxcase.telegram.TelegramLongPollingBotImpl;
import ru.group.robloxcase.user.User;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;

@Service
public class WithdrawalServiceImpl implements WithdrawalService{

    private final WithdrawalRepository withdrawalRepository;
    private final InventoryRepository inventoryRepository;
    private final TelegramLongPollingBotImpl telegramBot;

    public WithdrawalServiceImpl(WithdrawalRepository withdrawalRepository, InventoryRepository inventoryRepository, TelegramLongPollingBotImpl telegramBot) {
        this.withdrawalRepository = withdrawalRepository;
        this.inventoryRepository = inventoryRepository;
        this.telegramBot = telegramBot;
    }


    @Override
    public List<Withdrawal> findByUserId(Long userId) {
        return withdrawalRepository.findByUserId(userId);
    }

    @Override
    public List<Withdrawal> findAll() {
        List<Withdrawal> withdrawals = withdrawalRepository.findAll();
        Collections.reverse(withdrawals);
        return withdrawals;
    }

    @Transactional
    @Override
    public Withdrawal withdraw(Long userId, Long inventoryItemId) {
        Inventory inventory = inventoryRepository.findByUserId(userId)
                .orElseThrow(() -> new NotFoundException(String.format("Inventory for user with ID %1$s not found", userId)));

        List<InventoryItem> items = inventory.getItems();

        InventoryItem itemToRemove = items.stream()
                .filter(item -> item.getId().equals(inventoryItemId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(String.format("InventoryItem with ID %1$s not found in user's inventory", inventoryItemId)));

        items.remove(itemToRemove);

        inventoryRepository.save(inventory);

        User user = inventory.getUser();

        Withdrawal withdrawal = new Withdrawal(user, itemToRemove.getPetCard(), LocalDateTime.now());
        Withdrawal savedWithdrawal = withdrawalRepository.save(withdrawal);

        telegramBot.sendMessage(composeMessage(withdrawal));
        return savedWithdrawal;
    }

    @Transactional
    @Override
    public void deny(Long withdrawalId) {
        Withdrawal withdrawal = withdrawalRepository.findById(withdrawalId)
                .orElseThrow(() -> new NotFoundException(String.format("Withdrawal with ID %1$s not found", withdrawalId)));
        Long userId = withdrawal.getUser().getId();
        Inventory inventory = inventoryRepository.findByUserId(userId)
                .orElseThrow(() -> new NotFoundException(String.format("Inventory for user with ID %1$s not found", userId)));
        PetCard petCard = withdrawal.getPetCard();
        inventory.getItems().add(new InventoryItem(petCard, inventory));
        withdrawalRepository.deleteById(withdrawalId);
    }

    private String composeMessage(Withdrawal withdrawal){
        StringBuilder message = new StringBuilder();
        message.append("Запрос от `").append(withdrawal.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"))).append("` \n");
        message.append("\n");
        message.append(withdrawal.getUser().getContact().getType().getName()).append(": `").append(withdrawal.getUser().getContact().getLink()).append("` \n");
        message.append("Никнейм: `").append(withdrawal.getUser().getNickname()).append("`\n");
        message.append("Почта: ").append(withdrawal.getUser().getEmail()).append("\n");
        message.append("Питомец: `").append(withdrawal.getPetCard().getPet().getName()).append("`\n");
        message.append("Свойства:\n");

        withdrawal.getPetCard().getProperties().forEach(petProperty ->
                message.append("- ").append(petProperty.getName()).append(" \n")
        );

        return message.toString();
    }
}
