package ru.group.robloxcase.pet.card;

import org.springframework.stereotype.Service;
import ru.group.robloxcase.exception.NotFoundException;
import ru.group.robloxcase.pet.Pet;
import ru.group.robloxcase.pet.PetService;
import ru.group.robloxcase.pet.PetServiceImpl;
import ru.group.robloxcase.pet.property.PetProperty;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PetCardServiceImpl implements PetCardService{

    private final PetCardRepository petCardRepository;
    private final PetServiceImpl petService;

    public PetCardServiceImpl(PetCardRepository petCardRepository, PetServiceImpl petService) {
        this.petCardRepository = petCardRepository;
        this.petService = petService;
    }

    @Override
    public PetCard create(PetCardDto petCardDto) {
        Long petId = petCardDto.petId();
        Integer price = petCardDto.price();
        List<Long> propertyIds = petCardDto.propertyIds();
        Pet pet = petService.findById(petId);
        Set<PetProperty> properties = new HashSet<>();
        for(Long propertyId : propertyIds){
            if(propertyId.equals(PetProperty.NEON.getId()))
                properties.add(PetProperty.NEON);
            else if (propertyId.equals(PetProperty.MEGA_NEON.getId()))
                properties.add(PetProperty.MEGA_NEON);
            else if (propertyId.equals(PetProperty.FLYABLE.getId()))
                properties.add(PetProperty.FLYABLE);
            else if (propertyId.equals(PetProperty.RIDEABLE.getId()))
                properties.add(PetProperty.RIDEABLE);
            else
                throw new NotFoundException(String.format("PetProperty with ID=%1$s not found", propertyId));
        }
        PetCard petCard = new PetCard(pet, price, properties);
        return petCardRepository.save(petCard);
    }

    @Override
    public PetCard patchById(Long petCardId, PetCardDto petCardDto) {
        PetCard petCard = petCardRepository.findById(petCardId)
                .orElseThrow(()->new NotFoundException(String.format("PetCard with ID %1$s not found",petCardId)));
        Long petId = petCardDto.petId();
        Integer price = petCardDto.price();
        List<Long> propertyIds = petCardDto.propertyIds();
        Pet pet = petService.findById(petId);
        Set<PetProperty> properties = new HashSet<>();
        for(Long propertyId : propertyIds){
            if(propertyId.equals(PetProperty.NEON.getId()))
                properties.add(PetProperty.NEON);
            else if (propertyId.equals(PetProperty.MEGA_NEON.getId()))
                properties.add(PetProperty.MEGA_NEON);
            else if (propertyId.equals(PetProperty.FLYABLE.getId()))
                properties.add(PetProperty.FLYABLE);
            else if (propertyId.equals(PetProperty.RIDEABLE.getId()))
                properties.add(PetProperty.RIDEABLE);
            else
                throw new NotFoundException(String.format("PetProperty with ID=%1$s not found", propertyId));
        }
        if(price != null){
            petCard.setPrice(price);
        }
        petCard.setPet(pet);
        petCard.setProperties(properties);
        return petCardRepository.save(petCard);
    }

    @Override
    public PetCard findById(Long petCardId) {
        PetCard petCard = petCardRepository.findById(petCardId)
                .orElseThrow(()->new NotFoundException(String.format("PetCard with ID %1$s not found",petCardId)));
        Long petId = petCard.getPet().getId();
        Pet pet = petService.findById(petId);
        petCard.setPet(pet);
        return petCard;
    }

    @Override
    public void deleteById(Long petCardId) {
        petCardRepository.deleteById(petCardId);
    }

    @Override
    public List<PetCard> findAll() {
        return petCardRepository.findAll();
    }
}
