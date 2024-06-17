package com.chupachups.roblox_case.mappers;

import com.chupachups.roblox_case.dtos.auth.RegisterDto;
import com.chupachups.roblox_case.dtos.user.UserInfoDto;
import com.chupachups.roblox_case.models.RoleEntity;
import com.chupachups.roblox_case.models.UserEntity;
import org.mapstruct.*;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        injectionStrategy = InjectionStrategy.CONSTRUCTOR,
        uses = PetMapper.class
)

public interface UserMapper {

    UserInfoDto toDto(UserEntity user);

    UserEntity toEntity(RegisterDto createDto);

    default Integer toRoleDto(RoleEntity role) {
        return role.getName().ordinal();
    }

}

