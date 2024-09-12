package ru.group.robloxcase.inventory;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ru.group.robloxcase.box.Box;
import ru.group.robloxcase.pet.card.PetCard;

import java.util.List;

@RestController
@RequestMapping("/api/v1/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @PreAuthorize("hasAnyAuthority('user')")
    @GetMapping("/me")
    public ResponseEntity<Inventory> findMe() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Long userId = Long.parseLong(userDetails.getUsername());
        return ResponseEntity.ok(inventoryService.findByUserId(userId));
    }

    @PreAuthorize("hasAnyAuthority('admin', 'moderator')")
    @GetMapping
    public ResponseEntity<Inventory>  findByUserId(@RequestParam Long userId){
        return ResponseEntity.ok(inventoryService.findByUserId(userId));
    }

}
