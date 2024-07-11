package ru.group.robloxcase.pet;

import org.springframework.stereotype.Service;
import ru.group.robloxcase.util.FileStorageUtils;

import java.util.Arrays;

@Service
public class FilePetImageService implements PetImageService{

    private final static String IMAGE_DIRECTORY = "backend/src/main/resources/images/pet/";
    private final static String IMAGE_NAME_PREFIX = "pet_";
    private final static String IMAGE_EXTENSION = ".webp";

    @Override
    public void createImageOf(Pet pet) {
        String fileName = IMAGE_NAME_PREFIX + pet.getId() + IMAGE_EXTENSION;
        if(!FileStorageUtils.isFileExist(IMAGE_DIRECTORY, fileName))
            FileStorageUtils.saveFile(pet.getImage(), IMAGE_DIRECTORY, fileName);
    }

    @Override
    public void findImageOf(Pet pet) {
        String fileName = IMAGE_NAME_PREFIX + pet.getId() + IMAGE_EXTENSION;
        byte[] image;
        if(FileStorageUtils.isFileExist(IMAGE_DIRECTORY,fileName)) {
            image = FileStorageUtils.findFile(IMAGE_DIRECTORY, fileName);
            pet.setImage(image);
        }
    }

    @Override
    public void updateImageOf(Pet pet) {
        pet.setName(pet.getName().trim());
        String fileName = IMAGE_NAME_PREFIX + pet.getId() + IMAGE_EXTENSION;
        byte[] newImage = pet.getImage();
        byte[] oldImage;
        if(FileStorageUtils.isFileExist(IMAGE_DIRECTORY,fileName)) {
            oldImage = FileStorageUtils.findFile(IMAGE_DIRECTORY, fileName);
            if(!Arrays.equals(newImage, oldImage))
                FileStorageUtils.saveFile(newImage, IMAGE_DIRECTORY, fileName);
        }else{
            FileStorageUtils.saveFile(newImage, IMAGE_DIRECTORY, fileName);
        }
    }

    @Override
    public void deleteImageOf(Pet pet) {
        String fileName = IMAGE_NAME_PREFIX + pet.getId() + IMAGE_EXTENSION;
        FileStorageUtils.deleteFile(IMAGE_DIRECTORY, fileName);
    }
}
