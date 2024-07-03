package ru.group.robloxcase.pet;


import jakarta.persistence.*;

@Entity
@Table(name = "pet_rarity")
public class PetRarity {

    public static PetRarity COMMON = new PetRarity(1L, "common");
    public static PetRarity UNCOMMON = new PetRarity(2L, "uncommon");
    public static PetRarity RARE = new PetRarity(3L, "rare");
    public static PetRarity ULTRA_RARE = new PetRarity(4L, "ultra-rare");
    public static PetRarity LEGENDARY = new PetRarity(5L, "legendary");


    @Id
    @Column(name = "id")
    private Long id;
    private String name;

    public PetRarity() {
    }

    public PetRarity(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
