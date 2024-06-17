package com.chupachups.roblox_case.mappers;

import com.chupachups.roblox_case.dtos.pet.PetInfoDto;
import com.chupachups.roblox_case.models.PetEntity;
import com.chupachups.roblox_case.models.PetRarityEntity;
import com.chupachups.roblox_case.models.PetTypeEntity;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        injectionStrategy = InjectionStrategy.CONSTRUCTOR
)
public interface PetMapper {
    PetInfoDto toDto(PetEntity petEntity);

    default int mapPetTypeToName(PetTypeEntity petTypeEntity) {
        return petTypeEntity.getType().ordinal();
    }

    default int mapPetRarityToName(PetRarityEntity petRarityEntity) {
        return petRarityEntity.getRarity().ordinal();
    }
}
