package com.chupachups.roblox_case.controllers;

import com.chupachups.roblox_case.dtos.exception.ExceptionDto;
import com.chupachups.roblox_case.dtos.pet.PetExchangeDto;
import com.chupachups.roblox_case.dtos.token.TokenDto;
import com.chupachups.roblox_case.dtos.user.UserInfoDto;
import com.chupachups.roblox_case.dtos.user.UserUpdateInfoDto;
import com.chupachups.roblox_case.services.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.security.Principal;

@Tag(name = "User")
@SecurityRequirement(name = "bearerAuth")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    @Operation(summary = "Вывод информации о пользователе")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content=@Content(mediaType = "application/json",schema = @Schema(implementation = UserInfoDto.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Проблема с доступом",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = ExceptionDto.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Пользователь не найден",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = ExceptionDto.class))
            )
    })
    @GetMapping("/{username}")
    @PreAuthorize("@customSecurityExpression.userHasPermission(#username)")
    public ResponseEntity<UserInfoDto> getUser(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUser(username));
    }

    @Operation(summary = "Обновление основной информации о пользователе")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content=@Content(mediaType = "application/json",schema = @Schema(implementation = TokenDto.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Проблема с доступом",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = ExceptionDto.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Пользователь не найден",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = ExceptionDto.class))
            )
    })
    @PatchMapping("/{username}")
    @PreAuthorize("@customSecurityExpression.userHasPermission(#username)")
    public ResponseEntity<TokenDto> updateUser(
            @PathVariable String username,
            @RequestBody UserUpdateInfoDto userUpdateInfoDto,
            HttpServletResponse response
    ) {
        return ResponseEntity.ok(userService.updateUser(username,userUpdateInfoDto,response));
    }

    @Operation(summary = "Удаление пользователя ")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content=@Content(mediaType = "text/plain")
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Проблема с доступом",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = ExceptionDto.class))
            )
    })
    @DeleteMapping("/{username}")
    @PreAuthorize("@customSecurityExpression.userHasPermission(#username)")
    public ResponseEntity<String> deleteUser(
            @PathVariable String username,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        return ResponseEntity.ok(userService.deleteUser(username,request,response));
    }

    @Operation(summary = "Продажа pet из инвентаря пользователя")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content=@Content(mediaType = "text/plain")
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "у User нет этого Pet",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = ExceptionDto.class))
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
    @DeleteMapping("/{username}/pets/{id}")
    @PreAuthorize("@customSecurityExpression.userHasPermission(#username)")
    public ResponseEntity<UserInfoDto> sellPet(
            @PathVariable String username,
            @PathVariable long id
    ) {
        return ResponseEntity.ok(userService.sellPet(username,id));
    }

    @Operation(summary = "Покупка container")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content=@Content(mediaType = "text/plain")
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Недостаточно средств",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = ExceptionDto.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Проблема с доступом",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = ExceptionDto.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Container не найден",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = ExceptionDto.class))
            )
    })
    @PostMapping("/{username}/containers/{id}")
    @PreAuthorize("@customSecurityExpression.userHasPermission(#username)")
    public ResponseEntity<String> buyCase(
            @PathVariable String username,
            @PathVariable long id
    ) {
        return ResponseEntity.ok(userService.buyCase(username,id));
    }

    @Operation(summary = "Бан User")
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
                    description = "User не найден",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = ExceptionDto.class))
            )
    })
    @PostMapping("/{username}/ban")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<String> banUser(@PathVariable String username) {
        return ResponseEntity.ok(userService.banUser(username));
    }

    @Operation(summary = "Разбан User")
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
                    description = "User не найден",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = ExceptionDto.class))
            )
    })
    @PostMapping("/{username}/unban")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<String> unbanUser(@PathVariable String username) {
        return ResponseEntity.ok(userService.unbanUser(username));
    }

    @Operation(summary = "Вывод Pet с аккаунта User")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content=@Content(mediaType = "text/plain")
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "User не имеет этого пета",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = ExceptionDto.class))
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
    @DeleteMapping("/{username}/exchange")
    @PreAuthorize("@customSecurityExpression.userHasPermission(#username)")
    public ResponseEntity<String> exchangeUser(@PathVariable String username, @RequestBody PetExchangeDto dto) throws JsonProcessingException {
        return ResponseEntity.ok(userService.exchangePet(dto.message(),dto.pets(),username));
    }

    @Operation(summary = "Добавляет Pet на аккаунта User")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content=@Content(mediaType = "text/plain")
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "User уже обладает этим Pet",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = ExceptionDto.class))
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
    @PostMapping("/{username}/pets/{id}")
    @PreAuthorize("@customSecurityExpression.userHasPermission(#username)")
    public ResponseEntity<String> addPet(@PathVariable String username, @PathVariable long id) {
        return ResponseEntity.ok(userService.addPet(username,id));
    }

    @Operation(summary = "Увеличивает баланс пользователя, после успешной транзакции")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content=@Content(mediaType = "application/json",schema = @Schema(implementation = UserInfoDto.class))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Прибавляемая сумма меньше нуля",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = ExceptionDto.class))
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
    @PutMapping("/{username}")
    @PreAuthorize("@customSecurityExpression.userHasPermission(#username)")
    public ResponseEntity<UserInfoDto> growthBalance(@PathVariable String username, @RequestBody BigDecimal balance) {
        return ResponseEntity.ok(userService.growthBalance(username,balance));
    }

}
