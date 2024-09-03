package ru.group.robloxcase.roulette;

import org.springframework.stereotype.Service;
import ru.group.robloxcase.roulette.BoxRouletteService;
import ru.group.robloxcase.balance.Balance;
import ru.group.robloxcase.balance.BalanceRepository;
import ru.group.robloxcase.box.Box;
import ru.group.robloxcase.box.BoxRepository;
import ru.group.robloxcase.box.chance.Chance;
import ru.group.robloxcase.exception.NotFoundException;
import ru.group.robloxcase.spin_event.SpinEvent;
import ru.group.robloxcase.spin_event.SpinEventRepository;
import ru.group.robloxcase.inventory.Inventory;
import ru.group.robloxcase.inventory.InventoryRepository;
import ru.group.robloxcase.pet.card.PetCard;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class BoxRouletteServiceImpl implements BoxRouletteService {

    private static final int PERCENT_SUM = 10000;

    private final InventoryRepository inventoryRepository;
    private final BalanceRepository balanceRepository;
    private final BoxRepository boxRepository;
    private final SpinEventRepository spinEventRepository;

    public BoxRouletteServiceImpl(InventoryRepository inventoryRepository, BalanceRepository balanceRepository, BoxRepository boxRepository, SpinEventRepository spinEventRepository) {
        this.inventoryRepository = inventoryRepository;
        this.balanceRepository = balanceRepository;
        this.boxRepository = boxRepository;
        this.spinEventRepository = spinEventRepository;
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

        PetCard selectedPetCard = getRandomPet(box);

        inventory.getPetCards().add(selectedPetCard);

        SpinEvent spinEvent = new SpinEvent(inventory, box, selectedPetCard);

        inventoryRepository.save(inventory);
        spinEventRepository.save(spinEvent);

        return selectedPetCard;
    }

    private PetCard getRandomPet(Box box) {
        List<Chance> chances = box.getChances();
        int randomValue = new Random().nextInt(PERCENT_SUM) + 1;
        int cumulativeSum = 0;

        for (Chance chance : chances) {
            cumulativeSum += chance.getPercent();
            if (randomValue <= cumulativeSum) {
                return chance.getPetCard();
            }
        }

        throw new IllegalStateException("Spin failed to select a PetCard, please check the configuration of chances.");
    }

    public String testSpin(Long boxId, int spinCount) {

        // Получаем коробку для теста
        Box box = boxRepository.findById(boxId)
                .orElseThrow(() -> new NotFoundException(String.format("Box with ID %d not found", boxId)));

        // Словарь для подсчета количества выпадений каждой карты питомца
        Map<Long, Integer> petCardCounts = new HashMap<>();

        // Выполняем заданное количество спинов
        for (int i = 0; i < spinCount; i++) {
            PetCard petCard = getRandomPet(box);
            petCardCounts.put(petCard.getId(), petCardCounts.getOrDefault(petCard.getId(), 0) + 1);
        }

        // Строим строку с результатами
        StringBuilder result = new StringBuilder();
        result.append("Test Results:\n");
        for (Chance chance : box.getChances()) {
            Long petCardId = chance.getPetCard().getId();
            int count = petCardCounts.getOrDefault(petCardId, 0);
            double actualPercent = (double) count / spinCount * 100;
            double expectedPercent = (double) chance.getPercent() / 100;

            result.append(String.format("PetCard ID: %d | Expected: %.2f%% | Actual: %.2f%%\n",
                    petCardId, expectedPercent, actualPercent));
        }

        return result.toString();
    }
}
