package com.chupachups.roblox_case.dtos.pet;

import java.math.BigDecimal;
import java.util.List;

public record CreatePetDto(
        String name,
        List<Integer> types,
        int rarity,
        BigDecimal cost
) {
}
