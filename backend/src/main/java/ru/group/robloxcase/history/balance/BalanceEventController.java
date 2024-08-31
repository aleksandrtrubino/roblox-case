package ru.group.robloxcase.history.balance;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/balance/events")
public class BalanceEventController {

    private final BalanceEventService balanceEventService;

    public BalanceEventController(BalanceEventService balanceEventService) {
        this.balanceEventService = balanceEventService;
    }

    @PreAuthorize("hasAnyAuthority('moderator','admin')")
    @GetMapping
    public ResponseEntity<List<BalanceEvent>> findAllByUserId(@RequestParam Long userId){
        return ResponseEntity.ok(balanceEventService.findAllByUserId(userId));
    }

    @PreAuthorize("hasAnyAuthority('user')")
    @GetMapping("/me")
    public ResponseEntity<List<BalanceEvent>> findAllMe(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Long userId = Long.parseLong(userDetails.getUsername());
        return ResponseEntity.ok(balanceEventService.findAllByUserId(userId));
    }
}
