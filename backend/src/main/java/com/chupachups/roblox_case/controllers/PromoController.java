package com.chupachups.roblox_case.controllers;

import com.chupachups.roblox_case.dtos.exception.ExceptionDto;
import com.chupachups.roblox_case.dtos.promo.PercentPromoDto;
import com.chupachups.roblox_case.dtos.promo.PromoDto;
import com.chupachups.roblox_case.dtos.promo.QuantPromoDto;
import com.chupachups.roblox_case.services.PromoService;
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

import java.util.Optional;

@Tag(name = "Promo")
@SecurityRequirement(name = "bearerAuth")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/promos")
public class PromoController {

    private final PromoService promoService;

    @Operation(summary = "Возвращает все промокоды")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = PromoDto.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Проблема с доступом",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            )
    })
    @GetMapping()
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<PromoDto> getPromos(){
        return ResponseEntity.ok(promoService.getPromos());
    }

    @Operation(summary = "Создает количественный промокод")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content = @Content(mediaType = "text/plain")
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
    })
    @PostMapping("/quants")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<String> createQuantPromo(@RequestBody QuantPromoDto quant){
        return ResponseEntity.ok(promoService.saveQuantPromo(quant));
    }

    @Operation(summary = "Возвращает информацию количественный промокод")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = QuantPromoDto.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Проблема с доступом",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Код не найден",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            ),
    })
    @GetMapping("/quants/{promo}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<QuantPromoDto> getQuantPromo(@PathVariable String promo){
        return ResponseEntity.ok(promoService.getQuantPromo(promo));
    }

    @Operation(summary = "Использует количественный промокод")
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
                    description = "Код не найден",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            ),
    })
    @PatchMapping("/quants/{promo}")
    public ResponseEntity<String> useQuantPromo(@PathVariable String promo){
        return ResponseEntity.ok(promoService.useQuantPromo(promo));
    }

    @Operation(summary = "Удаляет количественный промокод")
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
                    description = "Код не найден",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            ),
    })
    @DeleteMapping("/quants/{promo}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<String> deleteQuantPromo(@PathVariable String promo){
        return ResponseEntity.ok(promoService.deleteQuantPromo(promo));
    }

    @Operation(summary = "Создает процентный промокод")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content = @Content(mediaType = "text/plain")
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
    })
    @PostMapping("/percents")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<String> createPercentPromo(@RequestBody PercentPromoDto percent,
                                                     @RequestParam(required = false) Optional<Long> ttl
    ){
        promoService.savePercentPromo(percent,ttl);
        return ResponseEntity.ok("Success");
    }

    @Operation(summary = "Возвращает информацию о процентном промокоде")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = PercentPromoDto.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Проблема с доступом",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Код не найден",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            ),
    })
    @GetMapping("/percents/{promo}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<PercentPromoDto> getPercentPromo(@PathVariable String promo){
        return ResponseEntity.ok(promoService.getPercentPromo(promo));
    }

    @Operation(summary = "Использует процентный промокод")
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
                    description = "Код не найден",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            ),
    })
    @PatchMapping("/percents/{promo}")
    public ResponseEntity<String> usePercentPromo(@PathVariable String promo){
        return ResponseEntity.ok(promoService.usePercentPromo(promo));
    }

    @Operation(summary = "Удаляет процентный промокод")
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
                    description = "Код не найден",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionDto.class))
            ),
    })
    @DeleteMapping("/percents/{promo}")
    public ResponseEntity<String> deletePercentPromo(@PathVariable String promo){
        return ResponseEntity.ok(promoService.deletePercentPromo(promo));
    }


}
