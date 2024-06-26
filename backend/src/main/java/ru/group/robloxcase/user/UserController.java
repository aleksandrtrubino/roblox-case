package ru.group.robloxcase.user;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ru.group.robloxcase.user.authority.Authority;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN')")
    @PostMapping
    public ResponseEntity<User> create(@RequestBody UserDto userDto, @RequestParam(required = false) Long authorityId){
        return ResponseEntity.ok(userService.create(userDto, authorityId));
    }

    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN')")
    @PutMapping("/{userId}")
    public ResponseEntity<User> patchById(@PathVariable Long userId, @RequestBody UserDto userDto){
        return ResponseEntity.ok(userService.patchById(userId, userDto));
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_SUPER_ADMIN')")
    @GetMapping("/{userId}")
    public ResponseEntity<User> findById(@PathVariable Long userId){
        return ResponseEntity.ok(userService.findById(userId));
    }

    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN')")
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteById(@PathVariable Long userId){
        userService.deleteById(userId);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_SUPER_ADMIN')")
    @GetMapping
    public ResponseEntity<List<User>> findAll(){
        return ResponseEntity.ok(userService.findAll());
    }

    @PostMapping("/me")
    public ResponseEntity<User> createMe(@RequestBody UserDto userDto){
        return ResponseEntity.ok(userService.create(userDto, Authority.ROLE_USER));
    }

    @PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN','ROLE_SUPER_ADMIN')")
    @GetMapping("/me")
    public ResponseEntity<User> findMe(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Long userId = Long.parseLong(userDetails.getUsername());
        return ResponseEntity.ok(userService.findById(userId));
    }

    @PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN','ROLE_SUPER_ADMIN')")
    @PutMapping("/me")
    public ResponseEntity<User> patchMe(@RequestBody UserDto userDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Long userId = Long.parseLong(userDetails.getUsername());
        return ResponseEntity.ok(userService.patchById(userId, userDto));
    }
}
