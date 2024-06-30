package ru.group.robloxcase.pet.card;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pet-cards")
public class PetCardController {

    PetCardServiceImpl petCardService;

    public PetCardController(PetCardServiceImpl petCardService) {
        this.petCardService = petCardService;
    }

    @PostMapping
    public ResponseEntity<PetCard> create(@RequestBody PetCardDto petCardDto){
        return ResponseEntity.ok(petCardService.create(petCardDto));
    }

    @PutMapping("/{petCardId}")
    public ResponseEntity<PetCard> patchById(@PathVariable Long petCardId, @RequestBody PetCardDto petCardDto){
        return ResponseEntity.ok(petCardService.patchById(petCardId, petCardDto));
    }

    @GetMapping("/{petCardId}")
    public ResponseEntity<PetCard> findById(@PathVariable Long petCardId){
        return ResponseEntity.ok(petCardService.findById(petCardId));
    }

    @DeleteMapping("/{petCardId}")
    public ResponseEntity<Void> deleteById(@PathVariable Long petCardId){
        petCardService.deleteById(petCardId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<PetCard>> findAll(){
        return ResponseEntity.ok(petCardService.findAll());
    }
}
