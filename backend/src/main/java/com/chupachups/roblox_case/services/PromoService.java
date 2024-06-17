package com.chupachups.roblox_case.services;

import com.chupachups.roblox_case.dtos.promo.PercentPromoDto;
import com.chupachups.roblox_case.dtos.promo.PromoDto;
import com.chupachups.roblox_case.dtos.promo.QuantPromoDto;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PromoService {

    private final String QUANT_PROMO_KEY_PREFIX = "quant_promo:";
    private final String PERCENT_PROMO_KEY_PREFIX = "percent_promo:";

    private final RedisTemplate<String, QuantPromoDto> quantPromoRedisTemplate;
    private final RedisTemplate<String, PercentPromoDto> percentPromoRedisTemplate;

    public String saveQuantPromo(QuantPromoDto quantPromoDto) {
        if (quantPromoDto.getUses() <= 0) {
            throw new IllegalArgumentException("Invalid uses count");
        }
        quantPromoRedisTemplate.opsForValue().set(QUANT_PROMO_KEY_PREFIX + quantPromoDto.getCode(), quantPromoDto);
        return "Promo saved";
    }

    public QuantPromoDto getQuantPromo(String code) {
        return Optional.ofNullable(quantPromoRedisTemplate.opsForValue().get(QUANT_PROMO_KEY_PREFIX + code)).orElseThrow(
                () -> new EntityNotFoundException("Quant promo code not found: " + code)
        );
    }

    public String useQuantPromo(String promoCode) {
        final var existingQuantPromoCodeDto = quantPromoRedisTemplate.opsForValue().get(QUANT_PROMO_KEY_PREFIX + promoCode);
        if (existingQuantPromoCodeDto == null || existingQuantPromoCodeDto.getUses() <= 0) {
            throw new EntityNotFoundException("Quant promo code not found: " + promoCode);
        }
        existingQuantPromoCodeDto.setUses(existingQuantPromoCodeDto.getUses() - 1);
        quantPromoRedisTemplate.opsForValue().set(QUANT_PROMO_KEY_PREFIX + promoCode, existingQuantPromoCodeDto);
        return "Promo " + promoCode + " has been used";
    }

    public String deleteQuantPromo(String promoCode) {
        final var promo = quantPromoRedisTemplate.opsForValue().getAndDelete(QUANT_PROMO_KEY_PREFIX + promoCode);
        if (promo == null) {
            throw new EntityNotFoundException("Quant promo code not found: " + promoCode);
        }
        return "Promo " + promoCode + " has been deleted";
    }

    public void savePercentPromo(PercentPromoDto percentPromoDto, Optional<Long> TTL) {
        if (TTL.isPresent() && percentPromoDto.getExpiryDate() == null) {
            percentPromoDto.setExpiryDate(LocalDateTime.now().plus(Duration.ofMillis(TTL.get())));
        }
        if (percentPromoDto.getExpiryDate() == null) {
            throw new IllegalArgumentException("Expiry Date cannot be null");
        }
        percentPromoDto.setUses(0);
        percentPromoRedisTemplate.opsForValue().set(PERCENT_PROMO_KEY_PREFIX + percentPromoDto.getCode(), percentPromoDto);
    }

    public PercentPromoDto getPercentPromo(String code) {
        return Optional.ofNullable(percentPromoRedisTemplate.opsForValue().get(PERCENT_PROMO_KEY_PREFIX + code)).orElseThrow(
                () -> new EntityNotFoundException("Percent promo code not found: " + code)
        );
    }

    public String usePercentPromo(String promoCode) {
        final var existingPercentPromoCodeDto = percentPromoRedisTemplate.opsForValue().get(PERCENT_PROMO_KEY_PREFIX + promoCode);
        if (existingPercentPromoCodeDto == null ||
                existingPercentPromoCodeDto.getExpiryDate() == null ||
                existingPercentPromoCodeDto.getExpiryDate().isBefore(LocalDateTime.now())
        ) {
            throw new EntityNotFoundException("Percent promo code not found: " + promoCode);
        }
        existingPercentPromoCodeDto.setUses(existingPercentPromoCodeDto.getUses() + 1);
        percentPromoRedisTemplate.opsForValue().set(PERCENT_PROMO_KEY_PREFIX + promoCode, existingPercentPromoCodeDto);
        return "Promo " + promoCode + " has been used";
    }

    public String deletePercentPromo(String promoCode) {
        final var promo = percentPromoRedisTemplate.opsForValue().getAndDelete(PERCENT_PROMO_KEY_PREFIX + promoCode);
        if (promo == null) {
            throw new EntityNotFoundException("Quant promo code not found: " + promoCode);
        }
        return "Promo " + promoCode + " has been deleted";
    }

    public PromoDto getPromos() {

        return new PromoDto(
                percentPromoRedisTemplate.opsForValue().multiGet(Objects.requireNonNull(percentPromoRedisTemplate.keys(PERCENT_PROMO_KEY_PREFIX + "*"))),
                quantPromoRedisTemplate.opsForValue().multiGet(Objects.requireNonNull(quantPromoRedisTemplate.keys(QUANT_PROMO_KEY_PREFIX + "*")))
        );
    }
}

