package ru.group.robloxcase.pet;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.group.robloxcase.exception.AlreadyExistsException;
import ru.group.robloxcase.exception.NotFoundException;
import ru.group.robloxcase.pet.rarity.PetRarity;
import ru.group.robloxcase.util.FileStorageUtils;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PetServiceImpl implements PetService{
    //TODO: проверить все методы на дурака

    private final static String IMAGE_DIRECTORY = "backend/src/main/resources/images/pet/";
    private final static String IMAGE_NAME_PREFIX = "pet_";
    private final static String IMAGE_EXTENSION = ".webp";

    private final PetRepository petRepository;

    public PetServiceImpl(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    @Transactional
    @Override
    public Pet create(PetDto petDto) {
        String name = petDto.getName();
        if(name == null){
            throw new IllegalArgumentException("Field 'name' of class Pet cannot be NULL");
        }
        if(petRepository.existsByName(name))
            throw new AlreadyExistsException(String.format("Pet with name '%1$s' already exists", name));

        Long rarityId = petDto.getRarityId();
        if(rarityId == null){
            throw new IllegalArgumentException("Field 'rarity' of class Pet cannot be NULL");
        }
        PetRarity rarity;
        if(rarityId.equals(PetRarity.COMMON.getId())){
            rarity = PetRarity.COMMON;
        } else if(rarityId.equals(PetRarity.UNCOMMON.getId())){
            rarity = PetRarity.UNCOMMON;
        } else if (rarityId.equals(PetRarity.RARE.getId())) {
            rarity = PetRarity.RARE;
        } else if (rarityId.equals(PetRarity.ULTRA_RARE.getId())) {
            rarity = PetRarity.ULTRA_RARE;
        } else if (rarityId.equals(PetRarity.LEGENDARY.getId())) {
            rarity = PetRarity.LEGENDARY;
        } else {
            throw new NotFoundException(String.format("PetRarity with ID=%1$s not found", rarityId));
        }
        Pet pet = new Pet(name, rarity);
        byte[] image = petDto.getImage();
        pet.setImage(image);
        return petRepository.save(pet);
    }

    @Transactional
    @Override
    public Pet patchById(Long petId, PetDto petDto) {
        Pet pet = petRepository.findById(petId)
                .orElseThrow(()->new NotFoundException(String.format("Pet with id %1$s not found",petId)));

        String name = petDto.getName();
        if(name != null){
            if(petRepository.existsByName(name))
                throw new AlreadyExistsException(String.format("Pet with name '%1$s' already exists", name));
            pet.setName(name);
        }

        Long rarityId = petDto.getRarityId();
        PetRarity rarity;
        if(rarityId != null){
            if(rarityId.equals(PetRarity.COMMON.getId())){
                rarity = PetRarity.COMMON;
            } else if(rarityId.equals(PetRarity.UNCOMMON.getId())){
                rarity = PetRarity.UNCOMMON;
            } else if (rarityId.equals(PetRarity.RARE.getId())) {
                rarity = PetRarity.RARE;
            } else if (rarityId.equals(PetRarity.ULTRA_RARE.getId())) {
                rarity = PetRarity.ULTRA_RARE;
            } else if (rarityId.equals(PetRarity.LEGENDARY.getId())) {
                rarity = PetRarity.LEGENDARY;
            } else {
                throw new NotFoundException(String.format("PetRarity with ID %1$s not found", rarityId));
            }
            pet.setRarity(rarity);
        }

        byte[] image = petDto.getImage();
        if(image != null) {
            pet.setImage(image);
        }
        return petRepository.save(pet);
    }

    @Transactional
    @Override
    public Pet findById(Long petId) {
        return petRepository.findById(petId)
                .orElseThrow(()->new NotFoundException(String.format("Pet with id %1$s not found",petId)));
    }

    @Transactional
    @Override
    public void deleteById(Long petId) {
        petRepository.deleteById(petId);
    }

    @Transactional
    @Override
    public List<Pet> findAll() {
        return petRepository.findAll();
    }

}
