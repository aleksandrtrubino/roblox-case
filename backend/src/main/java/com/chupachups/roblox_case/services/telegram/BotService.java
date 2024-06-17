package com.chupachups.roblox_case.services.telegram;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
@Service
@RequiredArgsConstructor
@Slf4j
public class BotService extends TelegramLongPollingBot {

    @Value("${bot.name}")
    private String botName;
    @Value("${bot.token}")
    private String token;
    @Value("${bot.chatId}")
    private long chatId;

    @Override
    public void onUpdateReceived(Update update) {
    }

    @Override
    public String getBotUsername() {
        return botName;
    }

    @Override
    public String getBotToken() {
        return token;
    }


    public void sendMessage(String message) {
        SendMessage msg = new SendMessage();
        msg.enableMarkdown(true);
        msg.setChatId(String.valueOf(chatId));
        msg.setText(message);
        try {
            execute(msg);
        }
        catch (TelegramApiException ex){
            log.warn("Error sending message {}", ex.getMessage());
        }
    }
}
