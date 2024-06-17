package com.chupachups.roblox_case.dtos.container;

import com.chupachups.roblox_case.dtos.pet.PetInfoDto;

import java.math.BigDecimal;
import java.util.Set;

public record ContainerInfoDto(
        long id,
        String name,
        BigDecimal cost,
        Set<PetInfoDto> pets
) {
}
