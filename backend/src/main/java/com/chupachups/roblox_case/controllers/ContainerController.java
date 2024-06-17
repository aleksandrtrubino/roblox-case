package com.chupachups.roblox_case.controllers;

import com.chupachups.roblox_case.dtos.container.ContainerCreateDto;
import com.chupachups.roblox_case.dtos.container.ContainerInfoDto;
import com.chupachups.roblox_case.dtos.container.ContainerUpdateDto;
import com.chupachups.roblox_case.dtos.exception.ExceptionDto;
import com.chupachups.roblox_case.services.ContainerService;
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

@Tag(name = "Container")
@SecurityRequirement(name = "bearerAuth")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/containers")
public class ContainerController {
    private final ContainerService containerService;

    @Operation(summary = "Выводит список container")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content = @Content(mediaType = "application/json", schema = @Schema(type = "array", implementation = ContainerInfoDto.class))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Проблема с входными данными",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Проблема с доступом",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            )
    })
    @GetMapping()
    public ResponseEntity<List<ContainerInfoDto>> getAllCases() {
        return ResponseEntity.ok(containerService.getCases());
    }

    @Operation(summary = "Создает container")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ContainerInfoDto.class))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Проблема с входными данными",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Проблема с доступом",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            ),
            @ApiResponse(
                responseCode = "409",
                description = "container с таким именем уже существует",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            )
    })
    @PostMapping()
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<ContainerInfoDto> createCase(@RequestBody ContainerCreateDto caseDto) {
        return ResponseEntity.ok(containerService.createCase(caseDto));
    }

    @Operation(summary = "Выводит container по id")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ContainerInfoDto.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Проблема с доступом",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Container не найден",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            )
    })
    @GetMapping("/{id}")
    public ResponseEntity<ContainerInfoDto> getCaseById(@PathVariable Long id) {
        return ResponseEntity.ok(containerService.getCase(id));
    }

    @Operation(summary = "Обновляет container по id")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ContainerInfoDto.class))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Проблема с входными данными",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Проблема с доступом",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Container не найден",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            )
    })
    @PatchMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<ContainerInfoDto> updateCase(
            @PathVariable Long id,
            @RequestBody ContainerUpdateDto containerUpdateDto
    ) {
        return ResponseEntity.ok(containerService.updateCase(id, containerUpdateDto));
    }

    @Operation(summary = "Удаляет container по id")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content = @Content(mediaType = "text/plain")
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Проблема с доступом",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Container не найден",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            )
    })
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<String> deleteCase(@PathVariable Long id) {
        return ResponseEntity.ok(containerService.deleteCase(id));
    }

    @Operation(summary = "Добавляет pet с petId в container по id")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ContainerInfoDto.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Проблема с доступом",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Container или Pet не найден",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            )
    })
    @PostMapping("/{id}/pets/{petId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<ContainerInfoDto> addPetToCase(@PathVariable Long id, @PathVariable Long petId) {
        return ResponseEntity.ok(containerService.addPetToCase(id, petId));
    }

    @Operation(summary = "Удаляет pet с petId из container по id")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ContainerInfoDto.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Проблема с доступом",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Container или Pet не найден",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            )
    })
    @DeleteMapping("/{id}/pets/{petId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<ContainerInfoDto> removePetFromCase(@PathVariable Long id, @PathVariable Long petId) {
        return ResponseEntity.ok(containerService.removePetFromCase(id, petId));
    }


}
