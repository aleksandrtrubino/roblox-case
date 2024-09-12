package ru.group.robloxcase.balance;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ru.group.robloxcase.box.Box;
import ru.group.robloxcase.box.BoxDto;

@RestController
@RequestMapping("/api/v1/balance")
public class BalanceController {

    private final BalanceService balanceService;

    public BalanceController(BalanceService balanceService) {
        this.balanceService = balanceService;
    }

    @PreAuthorize("hasAnyAuthority('user')")
    @PostMapping("/deposit/me")
    public ResponseEntity<Void> deposit(@RequestParam Integer sum, @RequestParam(required = false) String promoCode) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Long userId = Long.parseLong(userDetails.getUsername());
        balanceService.deposit(userId, sum, promoCode);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAnyAuthority('user')")
    @GetMapping("/me")
    public ResponseEntity<Balance> findMe() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Long userId = Long.parseLong(userDetails.getUsername());
        return ResponseEntity.ok(balanceService.findByUserId(userId));
    }

    @PreAuthorize("hasAnyAuthority('admin','moderator')")
    @GetMapping
    public ResponseEntity<Balance> findByUserId(@RequestParam Long userId){
        return ResponseEntity.ok(balanceService.findByUserId(userId));
    }
}
