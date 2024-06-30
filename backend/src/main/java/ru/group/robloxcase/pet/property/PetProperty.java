package ru.group.robloxcase.pet.property;


import jakarta.persistence.*;

//    NEON,
//    MEGA_NEON,
//    FLYABLE,
//    RIDEABLE
@Entity
@Table(name = "pet_properties")
public class PetProperty {

    public static PetProperty NEON = new PetProperty(1L, "neon");
    public static PetProperty MEGA_NEON = new PetProperty(2L, "mega_neon");
    public static PetProperty FLYABLE = new PetProperty(3L, "flyable");
    public static PetProperty RIDEABLE = new PetProperty(4L, "rideable");

    @Id
    @Column(name = "id")
    private Long id;
    private String name;

    public PetProperty() {
    }

    public PetProperty(Long id, String name) {
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
