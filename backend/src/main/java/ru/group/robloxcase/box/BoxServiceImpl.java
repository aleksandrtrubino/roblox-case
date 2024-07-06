package ru.group.robloxcase.box;

import org.springframework.stereotype.Service;
import ru.group.robloxcase.box.chance.Chance;
import ru.group.robloxcase.exception.NotFoundException;
import ru.group.robloxcase.pet.card.PetCard;
import ru.group.robloxcase.pet.card.PetCardRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BoxServiceImpl implements BoxService{

    private final BoxRepository boxRepository;
    private final PetCardRepository petCardRepository;

    public BoxServiceImpl(BoxRepository boxRepository, PetCardRepository petCardRepository) {
        this.boxRepository = boxRepository;
        this.petCardRepository = petCardRepository;
    }

    @Override
    public Box create(BoxDto boxDto) {
        Box box = new Box();
        box.setName(boxDto.name());
        box.setPrice(boxDto.price());

        List<Chance> chances = boxDto.chances().stream()
                .map(chanceDto -> {
                    PetCard petCard = petCardRepository.findById(chanceDto.petCardId())
                            .orElseThrow(() -> new NotFoundException(String.format("PetCard with ID %d not found", chanceDto.petCardId())));
                    return new Chance(petCard, box, chanceDto.percent());
                })
                .collect(Collectors.toList());

        box.setChances(chances);
        return boxRepository.save(box);
    }

    @Override
    public Box patchById(Long boxId, BoxDto boxDto) {
        Box box = boxRepository.findById(boxId)
                .orElseThrow(() -> new NotFoundException(String.format("Box with ID %d not found", boxId)));

        if (boxDto.name() != null) {
            box.setName(boxDto.name());
        }
        if (boxDto.price() != null) {
            box.setPrice(boxDto.price());
        }
        if (boxDto.chances() != null) {
            box.getChances().clear();
            List<Chance> chances = boxDto.chances().stream()
                    .map(chanceDto -> {
                        PetCard petCard = petCardRepository.findById(chanceDto.petCardId())
                                .orElseThrow(() -> new NotFoundException(String.format("PetCard with ID %d not found", chanceDto.petCardId())));
                        return new Chance(petCard, box, chanceDto.percent());
                    })
                    .collect(Collectors.toList());
            box.setChances(chances);
        }
        return boxRepository.save(box);
    }

    @Override
    public Box findById(Long boxId) {
        return boxRepository.findById(boxId)
                .orElseThrow(() -> new NotFoundException(String.format("Box with ID %d not found", boxId)));
    }

    @Override
    public void deleteById(Long boxId) {
        Box box = boxRepository.findById(boxId)
                .orElseThrow(() -> new NotFoundException(String.format("Box with ID %d not found", boxId)));
        boxRepository.delete(box);
    }

    @Override
    public List<Box> findAll() {
        return boxRepository.findAll();
    }
}
