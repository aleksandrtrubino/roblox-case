package ru.group.robloxcase.contact;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/contacts")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping
    public ResponseEntity<?> findContacts(@RequestParam(required = false) Long userId) {
        if (userId != null) {
            return ResponseEntity.ok(contactService.findByUserId(userId));
        } else {
            return ResponseEntity.ok(contactService.findAll());
        }
    }
}
