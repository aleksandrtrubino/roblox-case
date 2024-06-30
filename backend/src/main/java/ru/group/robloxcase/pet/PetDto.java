package ru.group.robloxcase.pet;

public class PetDto {
    String name;
    Long rarityId;
    byte[] image;


    public PetDto() {
    }

    public PetDto(String name, Long rarityId, byte[] image) {
        this.name = name;
        this.rarityId = rarityId;
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getRarityId() {
        return rarityId;
    }

    public void setRarity(Long rarityId) {
        this.rarityId = rarityId;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
