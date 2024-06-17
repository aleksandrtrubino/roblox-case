package com.chupachups.roblox_case.dtos.pet;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record PetPropertiesDto(
        @JsonProperty(value="types")
        List<String> petTypes,
        @JsonProperty(value="rarities")
        List<String> petRarities
) {
}
