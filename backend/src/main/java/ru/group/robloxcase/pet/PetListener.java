package ru.group.robloxcase.pet;

import jakarta.persistence.PostLoad;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreRemove;
import jakarta.persistence.PreUpdate;
import org.springframework.stereotype.Component;
import ru.group.robloxcase.util.FileStorageUtils;

@Component
public class PetListener {

    private final PetImageService petImageService;

    public PetListener(PetImageService petImageService) {
        this.petImageService = petImageService;
    }

    @PrePersist
    public void onPrePersist(Pet pet){
        petImageService.createImageOf(pet);
    }

    @PreUpdate
    public void onPreUpdate(Pet pet){
        petImageService.updateImageOf(pet);
    }

    @PostLoad
    public void onPostLoad(Pet pet){
        petImageService.findImageOf(pet);
    }

    @PreRemove
    public void onPreRemove(Pet pet){
        petImageService.deleteImageOf(pet);
    }

}
