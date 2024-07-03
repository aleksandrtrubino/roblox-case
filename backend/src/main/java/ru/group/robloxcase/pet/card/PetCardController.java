package ru.group.robloxcase.petcard;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pet-cards")
public class PetCardController {

    PetCardServiceImpl petCardService;

    public PetCardController(PetCardServiceImpl petCardService) {
        this.petCardService = petCardService;
    }

    @PreAuthorize("hasAnyAuthority('moderator','admin')")
    @PostMapping
    public ResponseEntity<PetCard> create(@RequestBody PetCardDto petCardDto){
        return ResponseEntity.ok(petCardService.create(petCardDto));
    }

    @PreAuthorize("hasAnyAuthority('moderator','admin')")
    @PutMapping("/{petCardId}")
    public ResponseEntity<PetCard> patchById(@PathVariable Long petCardId, @RequestBody PetCardDto petCardDto){
        return ResponseEntity.ok(petCardService.patchById(petCardId, petCardDto));
    }

    @PreAuthorize("hasAnyAuthority('user','moderator','admin')")
    @GetMapping("/{petCardId}")
    public ResponseEntity<PetCard> findById(@PathVariable Long petCardId){
        return ResponseEntity.ok(petCardService.findById(petCardId));
    }

    @PreAuthorize("hasAnyAuthority('moderator','admin')")
    @DeleteMapping("/{petCardId}")
    public ResponseEntity<Void> deleteById(@PathVariable Long petCardId){
        petCardService.deleteById(petCardId);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAnyAuthority('user','moderator','admin')")
    @GetMapping
    public ResponseEntity<List<PetCard>> findAll(){
        return ResponseEntity.ok(petCardService.findAll());
    }
}
