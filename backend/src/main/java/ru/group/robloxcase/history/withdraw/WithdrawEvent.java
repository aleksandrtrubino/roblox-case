package ru.group.robloxcase.history.withdraw;

import ru.group.robloxcase.pet.card.PetCard;
import ru.group.robloxcase.user.User;

import java.time.LocalDateTime;

public class WithdrawEvent {

    private Long id;
    private User user;
    private PetCard petCard;
    private LocalDateTime timestamp;

    public WithdrawEvent() {}

    public WithdrawEvent(User user, PetCard petCard, LocalDateTime timestamp) {
        this.user = user;
        this.petCard = petCard;
        this.timestamp = timestamp;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public PetCard getPetCard() {
        return petCard;
    }

    public void setPetCard(PetCard petCard) {
        this.petCard = petCard;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
