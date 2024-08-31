package ru.group.robloxcase.inventory;

import jakarta.persistence.*;
import ru.group.robloxcase.user.User;
import ru.group.robloxcase.pet.card.PetCard;
import ru.group.robloxcase.box.Box;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Entity
@Table(name = "inventory")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "inventory_seq")
    @Column(name = "id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToMany
    @JoinTable(
            name = "inventory_pet_cards",
            joinColumns = @JoinColumn(name = "inventory_id"),
            inverseJoinColumns = @JoinColumn(name = "pet_card_id")
    )
    private List<PetCard> petCards;


    public Inventory() {
        this.petCards = new ArrayList<>();
    }

    public Inventory(User user) {
        this.user = user;
        this.petCards = new ArrayList<>();
    }

    // Getters and setters
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<PetCard> getPetCards() {
        Collections.reverse(petCards);
        return petCards;
    }

    public void setPetCards(List<PetCard> petCards) {
        this.petCards = petCards;
    }
}