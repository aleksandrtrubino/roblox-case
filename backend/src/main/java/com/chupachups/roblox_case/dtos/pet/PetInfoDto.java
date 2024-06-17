package com.chupachups.roblox_case.dtos.pet;

import java.math.BigDecimal;
import java.util.List;

public record PetInfoDto(
        long id,
        String name,
        BigDecimal cost,
        List<Integer> types,
        int rarity
) {
}