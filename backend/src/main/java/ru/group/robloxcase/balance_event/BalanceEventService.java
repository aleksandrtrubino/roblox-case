package ru.group.robloxcase.balance_event;

import java.util.List;

public interface BalanceEventService {

    List<BalanceEvent> findAllByUserId(Long userId);
}
