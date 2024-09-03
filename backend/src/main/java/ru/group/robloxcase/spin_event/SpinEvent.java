package ru.group.robloxcase.spin_event;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import ru.group.robloxcase.box.Box;
import ru.group.robloxcase.inventory.Inventory;
import ru.group.robloxcase.pet.card.PetCard;

import java.time.LocalDateTime;

@Entity
@Table(name = "spin_events")
public class SpinEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "spin_events_seq")
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "inventory_id", referencedColumnName = "id")
    private Inventory inventory;

    @ManyToOne
    @JoinColumn(name = "box_id", referencedColumnName = "id")
    private Box box;

    @ManyToOne
    @JoinColumn(name = "pet_card_id", referencedColumnName = "id")
    private PetCard petCard;

    @CreationTimestamp
    @Column(name = "created_at",columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt;

    public SpinEvent() {}

    public SpinEvent(Inventory inventory, Box box, PetCard petCard) {
        this.inventory = inventory;
        this.box = box;
        this.petCard = petCard;
    }

    public Long getId() {
        return id;
    }

    public Inventory getInventory() {
        return inventory;
    }

    public void setInventory(Inventory inventory) {
        this.inventory = inventory;
    }

    public Box getBox() {
        return box;
    }

    public void setBox(Box box) {
        this.box = box;
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

}
