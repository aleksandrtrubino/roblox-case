package ru.group.robloxcase.withdrawal;

import java.util.List;

public interface WithdrawalService {

    List<Withdrawal> findByUserId(Long userId);
    Withdrawal withdraw(Long userId, Long inventoryItemId);
}
