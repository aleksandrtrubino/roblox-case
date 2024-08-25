package ru.group.robloxcase.action.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.group.robloxcase.action.service.BoxShopService;

@RestController
@RequestMapping("/api/v1/box-shop")
public class BoxShopController {

    private final BoxShopService boxShopService;

    public BoxShopController(BoxShopService boxShopService) {
        this.boxShopService = boxShopService;
    }

    @PostMapping("/buy/{boxId}")
    public ResponseEntity<Void> buy(@PathVariable Long boxId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Long userId = Long.parseLong(userDetails.getUsername());
        boxShopService.buy(userId, boxId);
        return ResponseEntity.ok().build();
    }
}
