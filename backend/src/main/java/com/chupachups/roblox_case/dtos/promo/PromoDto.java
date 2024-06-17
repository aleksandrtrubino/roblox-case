package com.chupachups.roblox_case.dtos.promo;

import org.springframework.lang.Nullable;

import java.util.List;

public record PromoDto(
        @Nullable
        List<PercentPromoDto> percentPromos,

        @Nullable
        List<QuantPromoDto> quantPromos
) {
}
