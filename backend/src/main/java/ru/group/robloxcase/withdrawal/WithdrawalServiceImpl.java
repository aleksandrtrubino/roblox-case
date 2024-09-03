package ru.group.robloxcase.withdrawal;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.group.robloxcase.exception.NotFoundException;
import ru.group.robloxcase.inventory.Inventory;
import ru.group.robloxcase.inventory.InventoryRepository;
import ru.group.robloxcase.pet.card.PetCard;
import ru.group.robloxcase.pet.property.PetProperty;
import ru.group.robloxcase.telegram.TelegramLongPollingBotImpl;
import ru.group.robloxcase.user.User;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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

    @Transactional
    @Override
    public Withdrawal withdraw(Long userId, Long petCardId) {
        Inventory inventory = inventoryRepository.findByUserId(userId)
                .orElseThrow(() -> new NotFoundException(String.format("Inventory for user with ID %1$s not found", userId)));

        List<PetCard> petCards = inventory.getPetCards();

        PetCard petCardToRemove = petCards.stream()
                .filter(petCard -> petCard.getId().equals(petCardId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(String.format("PetCard with ID %1$s not found in user's inventory", petCardId)));

        petCards.remove(petCardToRemove);

        inventoryRepository.save(inventory);

        User user = inventory.getUser();

        Withdrawal withdrawal = new Withdrawal(user, petCardToRemove, LocalDateTime.now());
        Withdrawal savedWithdrawal = withdrawalRepository.save(withdrawal);

        telegramBot.sendMessage(composeMessage(withdrawal));
        return savedWithdrawal;
    }

    private String composeMessage(Withdrawal withdrawal){
        StringBuilder message = new StringBuilder();
        message.append("Запрос от `").append(withdrawal.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"))).append("` \n");
        message.append("\n");
        message.append("Никнейм: `").append(withdrawal.getUser().getNickname()).append("`\n");
        message.append("Почта: ").append(withdrawal.getUser().getEmail()).append("\n");
        message.append("Питомец: `").append(withdrawal.getPetCard().getPet().getName()).append("`\n");
        message.append("Свойства:\n");

        withdrawal.getPetCard().getProperties().forEach(petProperty ->
                message.append("- ").append(petProperty.getName()).append("\n")
        );

        return message.toString();
    }
}
