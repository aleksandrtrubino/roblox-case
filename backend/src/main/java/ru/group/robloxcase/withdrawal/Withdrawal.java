package ru.group.robloxcase.withdrawal;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import ru.group.robloxcase.pet.card.PetCard;
import ru.group.robloxcase.user.User;

import java.time.LocalDateTime;

@Entity
@Table(name = "withdrawals")
public class Withdrawal {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "withdrawals_seq")
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "pet_card_id", referencedColumnName = "id")
    private PetCard petCard;

    @Column(name = "created_at",columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt;

    public Withdrawal() {}

    public Withdrawal(User user, PetCard petCard, LocalDateTime createdAt) {
        this.user = user;
        this.petCard = petCard;
        this.createdAt = createdAt;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
