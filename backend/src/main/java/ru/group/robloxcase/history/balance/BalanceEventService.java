package ru.group.robloxcase.history.balance;

import java.util.List;

public interface BalanceEventService {

    List<BalanceEvent> findAllByUserId(Long userId);
}
