package ru.group.robloxcase.user;

public record UserDto(
        String nickname,
        String email,
        String password,
        Boolean enabled) {
}
