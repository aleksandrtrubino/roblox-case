package ru.group.robloxcase.withdrawal;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/withdrawals")
public class WithdrawalController {

    private final WithdrawalService withdrawalService;

    public WithdrawalController(WithdrawalService withdrawalService) {
        this.withdrawalService = withdrawalService;
    }

    @GetMapping("/me")
    public ResponseEntity<List<Withdrawal>> findMe(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Long userId = Long.parseLong(userDetails.getUsername());
        return ResponseEntity.ok(withdrawalService.findByUserId(userId));
    }

    @GetMapping
    public ResponseEntity<List<Withdrawal>> findAll(@RequestParam(required = false) Long userId){
        if(userId != null)
            return ResponseEntity.ok(withdrawalService.findByUserId(userId));
        else
            return ResponseEntity.ok(withdrawalService.findAll());
    }

    @PostMapping("withdraw/me")
    public ResponseEntity<Withdrawal> withdraw(@RequestParam Long petCardId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Long userId = Long.parseLong(userDetails.getUsername());
        Withdrawal withdrawal = withdrawalService.withdraw(userId, petCardId);
        return ResponseEntity.ok(withdrawal);
    }

    @DeleteMapping("/{withdrawalId}")
    public ResponseEntity<Void> deny(@PathVariable Long withdrawalId){
        withdrawalService.deny(withdrawalId);
        return ResponseEntity.ok().build();
    }
}
