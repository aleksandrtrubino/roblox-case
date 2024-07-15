package ru.group.robloxcase.pet;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import ru.group.robloxcase.pet.rarity.PetRarity;
import ru.group.robloxcase.util.FileStorageUtils;


@Entity
@EntityListeners(PetListener.class)
@Table(name = "pets")
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pets_seq")
    @Column(name = "id")
    private Long id;
    @Column(name = "name")
    private String name;
    @ManyToOne
    @JoinColumn(name = "rarity_id")
    private PetRarity rarity;
    @Transient
    byte[] image;
    @JsonIgnore
    @Column(name = "image_change")
    private Integer imageChange = 0;

    public Pet() {
    }

    public Pet(String name, PetRarity rarity) {
        this.name = name;
        this.rarity = rarity;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public PetRarity getRarity() {
        return rarity;
    }

    public void setRarity(PetRarity rarity) {
        this.rarity = rarity;
    }

    public byte[] getImage() {
        return this.image;
    }

    public void setImage(byte[] image) {
        this.image = image;
        ++this.imageChange;
    }
}
