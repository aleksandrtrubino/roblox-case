package ru.group.robloxcase.pet;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/pets")
public class PetController {

    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @PreAuthorize("hasAnyAuthority('moderator','admin')")
    @PostMapping
    public ResponseEntity<Pet> create(
            @RequestParam("data") String data,
            @RequestParam("image") MultipartFile image)
    {
        PetDto petDto = null;
        try {
            petDto = new ObjectMapper().readValue(data, PetDto.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        byte[] image1;
        try {
            image1 = image.getBytes();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        petDto.setImage(image1);
        return ResponseEntity.ok(petService.create(petDto));
    }

    @PreAuthorize("hasAnyAuthority('moderator','admin')")
    @PatchMapping("/{petId}")
    public ResponseEntity<Pet> patchById(
            @PathVariable Long petId,
            @RequestParam(value = "data", required = false) String data,
            @RequestParam(value = "image",required = false) MultipartFile file)
    {
        PetDto petDto = new PetDto();
        if(data != null) {
            try {
                petDto = new ObjectMapper().readValue(data, PetDto.class);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }
        byte[] image;
        if(file != null) {
            try {
                image = file.getBytes();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            petDto.setImage(image);
        }
        return ResponseEntity.ok(petService.patchById(petId, petDto));
    }

    @PreAuthorize("hasAnyAuthority('moderator','admin')")
    @GetMapping("/{petId}")
    public ResponseEntity<Pet> findById(@PathVariable Long petId){
        return ResponseEntity.ok(petService.findById(petId));
    }

    @PreAuthorize("hasAnyAuthority('moderator','admin')")
    @DeleteMapping("{petId}")
    public ResponseEntity<Void> deleteById(@PathVariable Long petId){
        petService.deleteById(petId);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAnyAuthority('moderator','admin')")
    @GetMapping
    public ResponseEntity<List<Pet>> findAll(){
        return ResponseEntity.ok(petService.findAll());
    }
}
