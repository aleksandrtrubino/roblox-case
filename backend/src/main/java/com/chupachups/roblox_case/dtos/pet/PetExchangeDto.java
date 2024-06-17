package com.chupachups.roblox_case.dtos.pet;

import java.util.List;

public record PetExchangeDto(
        List<Long> pets,
        String message
) {
}
