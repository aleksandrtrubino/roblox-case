package ru.group.robloxcase.action.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.group.robloxcase.action.service.PetCardWheelService;
import ru.group.robloxcase.pet.card.PetCard;

@RestController
@RequestMapping("/api/v1/wheel")
public class PetCardWheelController {

    private final PetCardWheelService petCardWheelService;

    public PetCardWheelController(PetCardWheelService petCardWheelService) {
        this.petCardWheelService = petCardWheelService;
    }

    @PostMapping("/spin/{boxId}")
    public ResponseEntity<PetCard> spin(@PathVariable Long boxId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Long userId = Long.parseLong(userDetails.getUsername());
        return ResponseEntity.ok(petCardWheelService.spin(userId, boxId));
    }
}
