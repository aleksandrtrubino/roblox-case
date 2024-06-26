package ru.group.robloxcase.security;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<?> openSession(HttpServletRequest request, HttpServletResponse response, @RequestBody AuthDto authDto){
        TokenDto tokenDto = authService.openSession(request, response, authDto);
        return ResponseEntity.status(HttpStatus.OK).body(tokenDto);
    }

    @GetMapping
    public ResponseEntity<?> extendSession(HttpServletRequest request){
        TokenDto tokenDto = authService.extendSession(request);
        return ResponseEntity.status(HttpStatus.OK).body(tokenDto);
    }

    @DeleteMapping
    public ResponseEntity<?> closeSession(HttpServletResponse response){
        authService.closeSession(response);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}