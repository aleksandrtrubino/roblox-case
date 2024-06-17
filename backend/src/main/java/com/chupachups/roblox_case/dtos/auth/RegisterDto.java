package com.chupachups.roblox_case.dtos.auth;


import org.springframework.lang.Nullable;

public record RegisterDto(
        String username,
        @Nullable String email,
        String password
) {
}
