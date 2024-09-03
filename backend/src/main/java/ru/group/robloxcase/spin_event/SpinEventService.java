package ru.group.robloxcase.spin_event;

import java.util.List;

public interface SpinEventService {

    List<SpinEvent> findAllByUserId(Long userId);
}
