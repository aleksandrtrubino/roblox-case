package ru.group.robloxcase.email;

public interface EmailConfirmationService {
    Void sendEmail(String email);
    Void confirmEmail(String token);
}
