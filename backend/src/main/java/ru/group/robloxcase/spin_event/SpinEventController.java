package ru.group.robloxcase.spin_event;

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
@RequestMapping("/api/v1/spin-events")
public class SpinEventController {

    private final SpinEventService spinEventService;

    public SpinEventController(SpinEventService spinEventService) {
        this.spinEventService = spinEventService;
    }

    @PreAuthorize("hasAnyAuthority('moderator','admin')")
    @GetMapping
    public ResponseEntity<List<SpinEvent>> findAllByUserId(@RequestParam Long userId){
        return ResponseEntity.ok(spinEventService.findAllByUserId(userId));
    }

    @PreAuthorize("hasAnyAuthority('user')")
    @GetMapping("/me")
    public ResponseEntity<List<SpinEvent>> finAllMe(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Long userId = Long.parseLong(userDetails.getUsername());
        return ResponseEntity.ok(spinEventService.findAllByUserId(userId));
    }
}
