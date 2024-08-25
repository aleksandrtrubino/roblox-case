package ru.group.robloxcase.balance;

public interface BalanceService {
    void deposit(Long userId, int sum);
    void spend(Long userId, int price);
    Balance findByUserId(Long userId);
}
