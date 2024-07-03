package ru.group.robloxcase.petcard;


import java.util.List;

public interface PetCardService {
//    Pet create(PetDto petDto);
//    Pet patchById(Long petId, PetDto petDto);
//    Pet findById(Long petId);
//    void deleteById(Long peyId);
//
//    List<Pet> findAll();
    PetCard create(PetCardDto petCardDto);
    PetCard patchById(Long petCardId, PetCardDto petCardDto);
    PetCard findById(Long petCardId);
    void deleteById(Long petCardId);

    List<PetCard> findAll();
}
