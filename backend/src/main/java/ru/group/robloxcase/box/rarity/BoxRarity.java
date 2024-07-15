package ru.group.robloxcase.box.rarity;

import jakarta.persistence.*;

@Entity
@Table(name = "box_rarity")
public class BoxRarity {

    public static BoxRarity COMMON = new BoxRarity(1L, "common");
    public static BoxRarity UNCOMMON = new BoxRarity(2L, "uncommon");
    public static BoxRarity RARE = new BoxRarity(3L, "rare");
    public static BoxRarity LEGENDARY = new BoxRarity(4L, "legendary");


    @Id
    @Column(name = "id")
    private Long id;
    private String name;

    public BoxRarity() {
    }

    public BoxRarity(Long id, String name) {
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

