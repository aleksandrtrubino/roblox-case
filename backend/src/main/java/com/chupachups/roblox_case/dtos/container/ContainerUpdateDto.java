package com.chupachups.roblox_case.dtos.container;

import org.springframework.lang.Nullable;

import java.math.BigDecimal;

public record ContainerUpdateDto(
        @Nullable String name,
        @Nullable BigDecimal cost
        ) {
}
