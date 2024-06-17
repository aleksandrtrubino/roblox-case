package com.chupachups.roblox_case.dtos.promo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
public class QuantPromoDto implements Serializable {

    @JsonProperty(required = true)
    private String code;
    @JsonProperty(required = true)
    private int uses;
    @JsonProperty(required = true)
    private BigDecimal bonus;

}
