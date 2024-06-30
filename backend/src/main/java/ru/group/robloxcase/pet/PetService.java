package ru.group.robloxcase.pet;

import java.util.List;

public interface PetService {

    Pet create(PetDto petDto);
    Pet patchById(Long petId, PetDto petDto);
    Pet findById(Long petId);
    void deleteById(Long peyId);

    List<Pet> findAll();
}
