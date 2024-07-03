package ru.group.robloxcase.box;

import jakarta.persistence.*;
import ru.group.robloxcase.box.chance.Chance;
import ru.group.robloxcase.pet.card.PetCard;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "boxcases")
public class Chest {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "boxes_seq")
    @Column(name = "id")
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name="price")
    private Integer price;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "boxcases_pet_cards",
            joinColumns = @JoinColumn(name = "boxcase_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "pet_card_id", referencedColumnName = "id"))
    List<PetCard> petCards;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "boxcases_pet_cards",
            joinColumns = @JoinColumn(name = "boxcase_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "percent"))
    List<Chance> percents;

    public Chest() {
    }

    public Chest(String name, Integer price, List<PetCard> petCards, List<Integer> percents) {
        this.name = name;
        this.price = price;
        this.petCards = petCards;
        this.percents = percents;
    }

    public Chest(String name, Integer price) {
        this.name = name;
        this.price = price;
        this.petCards = new ArrayList<>();
        this.percents = new ArrayList<>();
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public List<PetCard> getPetCards() {
        return petCards;
    }

    public void setPetCards(List<PetCard> petCards) {
        this.petCards = petCards;
    }

    public List<Integer> getPercents() {
        return percents;
    }

    public void setPercents(List<Integer> percents) {
        this.percents = percents;
    }
}
