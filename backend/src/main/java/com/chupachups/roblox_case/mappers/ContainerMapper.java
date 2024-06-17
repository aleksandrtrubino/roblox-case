package com.chupachups.roblox_case.mappers;

import com.chupachups.roblox_case.dtos.container.ContainerInfoDto;
import com.chupachups.roblox_case.models.ContainerEntity;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        injectionStrategy = InjectionStrategy.CONSTRUCTOR,
        uses = PetMapper.class
)
public interface ContainerMapper {

    ContainerInfoDto toDto(ContainerEntity containerEntity);
}
