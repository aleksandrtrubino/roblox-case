package ru.group.robloxcase.box;

import ru.group.robloxcase.box.chance.ChanceDto;

import java.util.List;

public record BoxDto(String name, Integer price, Long rarityId, List<ChanceDto> chances) {
}
