package ru.group.robloxcase.exception;

import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({NotFoundException.class})
    public ResponseEntity<?> handleNotFoundException(RuntimeException e){
        Map<String,Object> responseBody = new HashMap<>();
        responseBody.put("exception",e.getClass().getSimpleName());
        responseBody.put("message",e.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
    }

    @ExceptionHandler({AlreadyExistsException.class})
    public ResponseEntity<?> handleAlreadyExistsException(RuntimeException e){
        Map<String,Object> responseBody = new HashMap<>();
        responseBody.put("exception",e.getClass().getSimpleName());
        responseBody.put("message",e.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    @ExceptionHandler({JwtException.class})
    public ResponseEntity<?> handleJwtException(RuntimeException e){
        Map<String,Object> responseBody = new HashMap<>();
        responseBody.put("exception",e.getClass().getSimpleName());
        responseBody.put("message",e.getMessage());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(responseBody);
    }

    @ExceptionHandler({AuthorizationDeniedException.class})
    public ResponseEntity<?> handleAuthorizationDeniedException(RuntimeException e){
        Map<String,Object> responseBody = new HashMap<>();
        responseBody.put("exception",e.getClass().getSimpleName());
        responseBody.put("message",e.getMessage());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(responseBody);
    }

    @ExceptionHandler({RuntimeException.class})
    public ResponseEntity<?> handleRuntimeException(RuntimeException e) {
        Map<String,Object> responseBody = new HashMap<>();
        responseBody.put("exception",e.getClass().getSimpleName());
        responseBody.put("message",e.getMessage());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }
}

