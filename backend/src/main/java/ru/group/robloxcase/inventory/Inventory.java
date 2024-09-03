package ru.group.robloxcase.inventory;

import jakarta.persistence.*;
import ru.group.robloxcase.inventory.item.InventoryItem;
import ru.group.robloxcase.user.User;
import ru.group.robloxcase.pet.card.PetCard;

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

    @OneToMany(mappedBy = "inventory", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private List<InventoryItem> items;


    public Inventory() {
        this.items = new ArrayList<>();
    }

    public Inventory(User user) {
        this.user = user;
        this.items = new ArrayList<>();
    }

    // Getters and setters
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<InventoryItem> getItems() {
        Collections.reverse(items);
        return items;
    }

    public void setItems(List<InventoryItem> petCards) {
        this.items = petCards;
    }
}