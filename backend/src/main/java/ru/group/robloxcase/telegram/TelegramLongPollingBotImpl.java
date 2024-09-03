package ru.group.robloxcase.telegram;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import ru.group.robloxcase.exception.NotFoundException;

@Service
public class TelegramLongPollingBotImpl extends TelegramLongPollingBot {

    private final String name;
    private final String token;
    private final long chatId;

    public TelegramLongPollingBotImpl(
            @Value("${telegram.bot.name}") String name,
            @Value("${telegram.bot.token}") String token,
            @Value("${telegram.bot.chat-id}") long chatId) {
        this.name = name;
        this.token = token;
        this.chatId = chatId;
    }

    @Override
    public String getBotUsername() {
        return name;
    }

    @Override
    public String getBotToken() {
        return token;
    }

    @Override
    public void onUpdateReceived(Update update) {
        // Handle incoming messages here if needed
    }

    public void sendMessage(String message) {
        SendMessage msg = new SendMessage();
        msg.enableMarkdown(true);
        msg.setChatId(String.valueOf(chatId));
        msg.setText(message);
        try {
            execute(msg);
        } catch (TelegramApiException ex) {
            throw new NotFoundException(ex.getMessage());
        }
    }
}

