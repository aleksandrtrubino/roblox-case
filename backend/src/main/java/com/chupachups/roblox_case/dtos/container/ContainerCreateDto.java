package com.chupachups.roblox_case.dtos.container;

import java.math.BigDecimal;

public record ContainerCreateDto(
        String name,
        BigDecimal cost
){
}
