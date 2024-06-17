package com.chupachups.roblox_case.controllers;


import com.chupachups.roblox_case.dtos.auth.LoginDto;
import com.chupachups.roblox_case.dtos.auth.RegisterDto;
import com.chupachups.roblox_case.dtos.exception.ExceptionDto;
import com.chupachups.roblox_case.dtos.token.TokenDto;
import com.chupachups.roblox_case.services.AuthenticationService;
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
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Tag(name = "Authentication")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;


    @Operation(summary = "Регистрирует пользователя")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = TokenDto.class))
            ),
            @ApiResponse(
                    responseCode = "409",
                    description = "username или email уже зарегистрированы",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            )
    })
    @PostMapping("/register")
    public ResponseEntity<TokenDto> register(
            @RequestBody RegisterDto registerDto,
            HttpServletResponse response
    ) {
        return ResponseEntity.ok(authenticationService.register(registerDto, response));
    }

    @Operation(summary = "Осуществляет вход для пользователя")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = TokenDto.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Неверные данные для входа",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            )
    })
    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(
            @RequestBody LoginDto loginDto,
            HttpServletResponse response
    ) {
        return ResponseEntity.ok(authenticationService.login(loginDto, response));
    }


    @Operation(summary = "Осуществляет выход из аккаунта", security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content = @Content(mediaType = "text/plain")
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Проблема с доступом",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            )
    })
    @PostMapping("/logout")
    @PreAuthorize("isAuthenticated()")
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        authenticationService.logout(request, response);
    }

    @Operation(summary = "Обновляет JWT по куки")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = TokenDto.class))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Отсутствует куки для обновления",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            ),
            @ApiResponse(
                    responseCode = "409",
                    description = "Токен просрочен или уже использован",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            )
    })
    @PostMapping("/refresh")
    public ResponseEntity<TokenDto> refreshAccessToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        return ResponseEntity.ok(authenticationService.refresh(request, response));
    }


    @Operation(summary = "Подтверждает почту")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content = @Content(mediaType = "text/plain")
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Пользователь с указанной почтой не найден",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            )
    })
    @PostMapping("/confirmation")
    public ResponseEntity<String> confirmEmail(@RequestParam String email) {
        return ResponseEntity.ok(authenticationService.confirmEmail(email));
    }


}

