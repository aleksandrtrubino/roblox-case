package ru.group.robloxcase.box.chance;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import ru.group.robloxcase.box.Box;
import ru.group.robloxcase.pet.card.PetCard;

@Entity
@Table(name = "chances")
public class Chance {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "chances_seq")
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pet_card_id")
    private PetCard petCard;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "box_id")
    private Box box;

    @Column(name = "percent")
    private Integer percent;

    public Chance() {
    }

    public Chance(PetCard petCard, Box box, Integer percent) {
        this.petCard = petCard;
        this.box = box;
        this.percent = percent;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PetCard getPetCard() {
        return petCard;
    }

    public void setPetCard(PetCard petCard) {
        this.petCard = petCard;
    }

    public Box getBox() {
        return box;
    }

    public void setBox(Box box) {
        this.box = box;
    }

    public Integer getPercent() {
        return percent;
    }

    public void setPercent(Integer percent) {
        this.percent = percent;
    }
}
