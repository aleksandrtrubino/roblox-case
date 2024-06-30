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

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_SUPER_ADMIN')")
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

    @PutMapping("/{petId}")
    public ResponseEntity<Pet> patchById(
            @PathVariable Long petId,
            @RequestParam("data") String data,
            @RequestParam("image") MultipartFile file)
    {
        PetDto petDto = null;
        try {
            petDto = new ObjectMapper().readValue(data, PetDto.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        byte[] image;
        try {
            image = file.getBytes();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        petDto.setImage(image);
        return ResponseEntity.ok(petService.patchById(petId, petDto));
    }

    @GetMapping("/{petId}")
    public ResponseEntity<Pet> findById(@PathVariable Long petId){
        return ResponseEntity.ok(petService.findById(petId));
    }

    @DeleteMapping("{petId}")
    public ResponseEntity<Void> deleteById(@PathVariable Long petId){
        petService.deleteById(petId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Pet>> findAll(){
        return ResponseEntity.ok(petService.findAll());
    }
}
