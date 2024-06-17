package com.chupachups.roblox_case.dtos.promo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class PercentPromoDto implements Serializable {

    @JsonProperty(required = true)
    private String code;
    private int uses;
    @JsonProperty(required = true)
    private BigDecimal percent;
    private LocalDateTime expiryDate;

}
