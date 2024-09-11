package ru.group.robloxcase.email;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class EmailConfirmationController {

    private final EmailConfirmationService emailConfirmationService;

    public EmailConfirmationController(EmailConfirmationService emailConfirmationService) {
        this.emailConfirmationService = emailConfirmationService;
    }

    @GetMapping("/email-confirmation")
    public ResponseEntity<Void> confirmEmail(@RequestParam("token") String emailConfirmationToken){
        emailConfirmationService.confirmEmail(emailConfirmationToken);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/email-confirmation")
    public ResponseEntity<Void> sendEmail(@RequestParam String email){
        return ResponseEntity.ok(emailConfirmationService.sendEmail(email));
    }
}
