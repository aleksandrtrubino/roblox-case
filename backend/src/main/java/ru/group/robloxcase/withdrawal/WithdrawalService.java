package ru.group.robloxcase.withdrawal;

import java.util.List;

public interface WithdrawalService {

    List<Withdrawal> findByUserId(Long userId);
    List<Withdrawal> findAll();
    Withdrawal withdraw(Long userId, Long inventoryItemId);
    void deny(Long withdrawalId);
}
