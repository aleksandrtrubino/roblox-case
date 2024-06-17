package com.chupachups.roblox_case.dtos.pet;

import org.springframework.lang.Nullable;

import java.math.BigDecimal;
import java.util.List;

public record UpdatePetDto(
        @Nullable String name,
        @Nullable List<Integer> types,
        @Nullable Integer rarity,
        @Nullable BigDecimal cost
) {
}
