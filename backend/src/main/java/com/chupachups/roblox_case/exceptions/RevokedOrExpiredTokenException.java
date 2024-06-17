package com.chupachups.roblox_case.exceptions;

public class RevokedOrExpiredTokenException extends RuntimeException{
    public RevokedOrExpiredTokenException(String message){
        super(message);
    }
}
