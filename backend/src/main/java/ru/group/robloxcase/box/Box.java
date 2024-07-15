package ru.group.robloxcase.box;

import jakarta.persistence.*;
import ru.group.robloxcase.box.chance.Chance;
import ru.group.robloxcase.box.rarity.BoxRarity;

import java.util.List;

@Entity
@Table(name = "boxes")
public class Box {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "boxes_seq")
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name="price")
    private Integer price;

    @ManyToOne
    @JoinColumn(name = "rarity_id")
    private BoxRarity rarity;

    @OneToMany(mappedBy = "box", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Chance> chances;
    
    public Long getId() {
        return id;
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

    public BoxRarity getRarity() {
        return rarity;
    }

    public void setRarity(BoxRarity rarity) {
        this.rarity = rarity;
    }

    public List<Chance> getChances() {
        return chances;
    }

    public void setChances(List<Chance> chances) {
        this.chances = chances;
    }
}
