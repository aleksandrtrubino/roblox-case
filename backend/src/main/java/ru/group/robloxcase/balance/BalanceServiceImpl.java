package ru.group.robloxcase.balance;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.group.robloxcase.exception.NotFoundException;
import ru.group.robloxcase.history.balance.BalanceEvent;
import ru.group.robloxcase.history.balance.BalanceEventRepository;
import ru.group.robloxcase.user.User;
import ru.group.robloxcase.user.UserRepository;

import java.util.Optional;

@Service
public class BalanceServiceImpl implements BalanceService{

    private final BalanceRepository balanceRepository;
    private final BalanceEventRepository balanceEventRepository;

    public BalanceServiceImpl(BalanceRepository balanceRepository, BalanceEventRepository balanceEventRepository) {
        this.balanceRepository = balanceRepository;
        this.balanceEventRepository = balanceEventRepository;
    }

    @Transactional
    @Override
    public void deposit(Long userId, int sum) {
        Balance balance = balanceRepository.findByUserId(userId)
                .orElseThrow(()->new NotFoundException(String.format("Balance for user with id %1$s not found",userId)));
        int currentBalance = balance.getBalance();
        balance.setBalance(currentBalance + sum);
        BalanceEvent balanceEvent = new BalanceEvent(balance, sum);
        balanceRepository.save(balance);
        balanceEventRepository.save(balanceEvent);
    }

    @Transactional
    @Override
    public void spend(Long userId, int price) {
        Balance balance = balanceRepository.findByUserId(userId)
                .orElseThrow(()->new NotFoundException(String.format("Balance for user with id %1$s not found",userId)));
        int currentBalance = balance.getBalance();
        if(currentBalance < price) {
            throw new NotFoundException("Not enough money");
        }
        else {
            balance.setBalance(currentBalance - price);
        }
        balanceRepository.save(balance);
    }

    @Override
    public Balance findByUserId(Long userId) {
        return balanceRepository.findByUserId(userId)
                .orElseThrow(()->new NotFoundException(String.format("Balance for user with id %1$s not found",userId)));
    }

}
