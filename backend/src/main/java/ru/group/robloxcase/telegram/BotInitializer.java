package ru.group.robloxcase.telegram;

import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;
import ru.group.robloxcase.exception.NotFoundException;

@Component
public class BotInitializer {
    private final TelegramLongPollingBotImpl telegramBot;

    public BotInitializer(TelegramLongPollingBotImpl telegramBot) {
        this.telegramBot = telegramBot;
    }

    @EventListener({ContextRefreshedEvent.class})
    public void  init() throws TelegramApiException {
        TelegramBotsApi botsApi = new TelegramBotsApi(DefaultBotSession.class);
        try{
            botsApi.registerBot(telegramBot);
        } catch (TelegramApiException e){
            throw new NotFoundException("Telegram exception");
        }
    }
}
