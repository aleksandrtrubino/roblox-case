package com.chupachups.roblox_case.dtos.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.lang.Nullable;

public record UserUpdateInfoDto(
        @Nullable String username,
        @Nullable String email,
        @JsonProperty("old_password")
        @Nullable String oldPassword,
        @JsonProperty("new_password")
        @Nullable String newPassword
) {
}
