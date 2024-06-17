package com.chupachups.roblox_case.dtos.user;

import com.chupachups.roblox_case.dtos.pet.PetInfoDto;
import lombok.Builder;
import lombok.Data;
import org.springframework.lang.Nullable;

import java.math.BigDecimal;
import java.util.List;

@Builder
@Data
public class UserInfoDto {

    private Long id;

    private String username;

    private String email;

    private BigDecimal balance;

    private List<PetInfoDto> pets;

    private Boolean isEmailConfirmed;

    private Integer role;

}
