package com.chupachups.roblox_case.services;

import com.chupachups.roblox_case.dtos.exception.ExceptionDto;
import com.chupachups.roblox_case.exceptions.ResourceAlreadyExist;
import com.chupachups.roblox_case.exceptions.RevokedOrExpiredTokenException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionService {
    @ExceptionHandler({IllegalArgumentException.class, IndexOutOfBoundsException.class})
    public ResponseEntity<ExceptionDto> handleBadRequestException(Exception ex) {
        return ResponseEntity.status(400).contentType(MediaType.APPLICATION_JSON).body(new ExceptionDto("BAD_REQUEST", ex.getMessage()));
    }

    @ExceptionHandler({EntityNotFoundException.class})
    public ResponseEntity<ExceptionDto> handleNotFoundException(EntityNotFoundException ex) {
        return ResponseEntity.status(404).contentType(MediaType.APPLICATION_JSON).body(new ExceptionDto("NOT_FOUND", ex.getMessage()));
    }

    @ExceptionHandler({ResourceAlreadyExist.class, RevokedOrExpiredTokenException.class})
    public ResponseEntity<ExceptionDto> handleConflictException(Exception ex) {
        return ResponseEntity.status(409).contentType(MediaType.APPLICATION_JSON).body(new ExceptionDto("CONFLICT", ex.getMessage()));
    }
}
