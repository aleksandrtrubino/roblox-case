package com.chupachups.roblox_case.services;

import com.chupachups.roblox_case.dtos.pet.CreatePetDto;
import com.chupachups.roblox_case.dtos.pet.PetInfoDto;
import com.chupachups.roblox_case.dtos.pet.PetPropertiesDto;
import com.chupachups.roblox_case.dtos.pet.UpdatePetDto;
import com.chupachups.roblox_case.mappers.PetMapper;
import com.chupachups.roblox_case.models.PetEntity;
import com.chupachups.roblox_case.models.enums.PetRarity;
import com.chupachups.roblox_case.models.enums.PetType;
import com.chupachups.roblox_case.repositories.PetRarityRepository;
import com.chupachups.roblox_case.repositories.PetRepository;
import com.chupachups.roblox_case.repositories.PetTypeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class PetService {
    private final PetRepository petRepository;
    private final PetRarityRepository petRarityRepository;
    private final PetTypeRepository petTypeRepository;
    private final PetMapper petMapper;

    public PetInfoDto createPet(CreatePetDto petDto) {
        if (petDto.cost().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Cost must be greater than zero");
        }
        return petMapper.toDto(
                petRepository.save(
                        PetEntity.builder()
                                .name(petDto.name())
                                .cost(petDto.cost())
                                .types(
                                        petDto.types().stream().map(
                                                type -> {
                                                    if(type<0||type>=PetType.values().length){
                                                        throw new IllegalArgumentException("Invalid type");
                                                    }
                                                    return petTypeRepository.findByType(PetType.values()[type]).orElseThrow(
                                                            () -> new EntityNotFoundException("Pet type " + type + " not found")
                                                    );
                                                }
                                        ).toList()
                                )
                                .rarity(
                                        petRarityRepository.findByRarity(
                                                        PetRarity.values()[petDto.rarity()]
                                        ).orElseThrow(
                                                () -> new EntityNotFoundException("Pet rarity " + petDto.rarity() + " not found")
                                        )
                                )
                                .build()
                )
        );
    }

    public PetInfoDto updatePet(long id, UpdatePetDto petDto) {
        final var pet = petRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Invalid pet id: " + id)
        );
        if (petDto.name() != null) {
            if (petDto.name().trim().isEmpty()) {
                throw new IllegalArgumentException("Invalid pet name");
            }
            pet.setName(petDto.name());
        }
        if ((petDto.cost() != null)) {
            if ((petDto.cost().compareTo(BigDecimal.ZERO) <= 0)) {
                throw new IllegalArgumentException("Invalid cost: " + petDto.cost());
            }
            pet.setCost(petDto.cost());
        }
        if (petDto.types() != null) {
            pet.setTypes(
                    petDto.types().stream().map(
                            type -> {
                                if (type < 0||type>=PetType.values().length) {
                                    throw new IllegalArgumentException("Invalid pet type: "+type);
                                }
                                return petTypeRepository.findByType(PetType.values()[type]).orElseThrow(
                                        () -> new EntityNotFoundException("Pet type " + type + " not found")
                                );

                            }

                    ).toList()
            );
        }
        if (petDto.rarity() != null) {
            if (petDto.rarity() < 0||petDto.rarity()>=PetRarity.values().length) {
                throw new IllegalArgumentException("Invalid pet rarity: " + petDto.rarity());
            }
            pet.setRarity(
                    petRarityRepository.findByRarity(PetRarity.values()[petDto.rarity()]).orElseThrow(
                            () -> new EntityNotFoundException("Pet rarity not found: " + petDto.rarity())
                    )
            );
        }
        return petMapper.toDto(pet);
    }


    @Transactional(readOnly = true)
    public PetInfoDto getPetById(long id) {
        return petMapper.toDto(petRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Pet not found")
        ));
    }

    public String deletePet(long id) {
        if (!petRepository.existsById(id)) {
            throw new EntityNotFoundException("Pet with id " + id + " not found");
        }
        petRepository.deleteById(id);
        return "Pet " + id + " deleted";
    }

    @Transactional(readOnly = true)
    public PetPropertiesDto getPetProperties() {
        return new PetPropertiesDto(
                petTypeRepository.findAll().stream().map(type -> type.getType().name()).toList(),
                petRarityRepository.findAll().stream().map(type -> type.getRarity().name()).toList()
        );
    }

    @Transactional(readOnly = true)
    public List<PetInfoDto> getAllPets() {
        return petRepository.findAll().stream().map(petMapper::toDto).toList();
    }
}

