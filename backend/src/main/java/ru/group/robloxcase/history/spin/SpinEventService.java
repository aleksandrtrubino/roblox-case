package ru.group.robloxcase.history.spin;

import java.util.List;

public interface SpinEventService {

    List<SpinEvent> findAllByUserId(Long userId);
}
