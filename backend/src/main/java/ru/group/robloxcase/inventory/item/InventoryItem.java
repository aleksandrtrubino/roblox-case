package ru.group.robloxcase.inventory.item;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import ru.group.robloxcase.inventory.Inventory;
import ru.group.robloxcase.pet.card.PetCard;

import java.time.LocalDateTime;

@Entity
@Table(name = "inventory_items")
public class InventoryItem {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "inventory_items_seq")
    @Column(name = "id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "pet_card_id", referencedColumnName = "id")
    PetCard petCard;

    @CreationTimestamp
    @Column(name = "created_at",columnDefinition = "TIMESTAMP")
    LocalDateTime createdAt;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inventory_id", nullable = false)
    private Inventory inventory;

    public InventoryItem() {}

    public InventoryItem(PetCard petCard, Inventory inventory) {
        this.petCard = petCard;
        this.inventory = inventory;
    }

    public Long getId() {
        return id;
    }

    public PetCard getPetCard() {
        return petCard;
    }

    public void setPetCard(PetCard petCard) {
        this.petCard = petCard;
    }

    public Inventory getInventory() {
        return inventory;
    }

    public void setInventory(Inventory inventory) {
        this.inventory = inventory;
    }
}
