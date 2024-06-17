package com.chupachups.roblox_case.dtos.token;

import com.fasterxml.jackson.annotation.JsonProperty;

public record TokenDto (
    @JsonProperty("access_token")
    String accessToken
){

}

