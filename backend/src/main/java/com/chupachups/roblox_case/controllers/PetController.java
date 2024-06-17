package com.chupachups.roblox_case.controllers;

import com.chupachups.roblox_case.dtos.exception.ExceptionDto;
import com.chupachups.roblox_case.dtos.pet.CreatePetDto;
import com.chupachups.roblox_case.dtos.pet.PetInfoDto;
import com.chupachups.roblox_case.dtos.pet.PetPropertiesDto;
import com.chupachups.roblox_case.dtos.pet.UpdatePetDto;
import com.chupachups.roblox_case.services.PetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Pet")
@SecurityRequirement(name = "bearerAuth")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/pets")
public class PetController {

    private final PetService petService;

    @Operation(summary = "Выводит всех pet")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content=@Content(mediaType = "application/json",schema = @Schema(type = "array",implementation = PetInfoDto.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Проблема с доступом",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = ExceptionDto.class))
            )
    })
    @GetMapping()
    public ResponseEntity<List<PetInfoDto>> getAllPets() {
        return ResponseEntity.ok(petService.getAllPets());
    }

    @Operation(summary = "Создает pet")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content=@Content(mediaType = "application/json",schema = @Schema(implementation = PetInfoDto.class))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Проблема с данными ",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = ExceptionDto.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Проблема с доступом",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = ExceptionDto.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Тип или редкость pet не найдены",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = ExceptionDto.class))
            )
    })
    @PostMapping()
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<PetInfoDto> createPet(@RequestBody CreatePetDto petDto){
        return ResponseEntity.ok(petService.createPet(petDto));
    }

    @Operation(summary = "Вывод информации о pet по id")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content=@Content(mediaType = "application/json",schema = @Schema( implementation = PetInfoDto.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Проблема с доступом",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = ExceptionDto.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Pet не найден",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = ExceptionDto.class))
            )
    })
    @GetMapping("/{id}")
    public ResponseEntity<PetInfoDto> getPetById(@PathVariable("id") long id) {
        return ResponseEntity.ok(petService.getPetById(id));
    }

    @Operation(summary = "Обновляет pet")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content=@Content(mediaType = "application/json",schema = @Schema(implementation = PetInfoDto.class))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Проблема с входными данными",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = ExceptionDto.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Проблема с доступом",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = ExceptionDto.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Тип или редкость pet не найдены",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = ExceptionDto.class))
            )
    })
    @PatchMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<PetInfoDto> updatePet(@PathVariable long id,@RequestBody UpdatePetDto petDto){
        return ResponseEntity.ok(petService.updatePet(id,petDto));
    }

    @Operation(summary = "Удаляет pet")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content=@Content(mediaType = "text/plain")
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Проблема с доступом",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = ExceptionDto.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Pet не найден",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            )
    })
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<String> deletePet(@PathVariable long id){
        return ResponseEntity.ok(petService.deletePet(id));
    }

    @Operation(summary = "Вывод всех доступных характеристик для PET")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = PetPropertiesDto.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Проблема с доступом",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = ExceptionDto.class))
            )
    })
    @GetMapping("/props")
    public ResponseEntity<PetPropertiesDto> getPetProperties(){
        return ResponseEntity.ok(petService.getPetProperties());
    }
}
