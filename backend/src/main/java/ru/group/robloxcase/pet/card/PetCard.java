package ru.group.robloxcase.pet.card;


import jakarta.persistence.*;
import ru.group.robloxcase.pet.Pet;
import ru.group.robloxcase.pet.property.PetProperty;

import java.util.Set;


@Entity
@Table(name = "pet_cards")
public class PetCard {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pet_cards_seq")
    @Column(name = "id")
    private Long id;
    @Column(name = "price")
    private Integer price;
    @ManyToOne
    @JoinColumn(name = "pet_id")
    Pet pet;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "pet_cards_pet_properties",
            joinColumns = @JoinColumn(name = "pet_card_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "pet_property_id", referencedColumnName = "id"))
    private Set<PetProperty> properties;

    public PetCard() {
    }

    public PetCard(Pet pet, Integer price, Set<PetProperty> properties) {
        this.pet = pet;
        this.price = price;
        this.properties = properties;
    }

    public Long getId() {
        return id;
    }

    public Pet getPet() {
        return pet;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }

    public Set<PetProperty> getProperties() {
        return properties;
    }

    public void setProperties(Set<PetProperty> properties) {
        this.properties = properties;
    }
}
