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


    @PreAuthorize("hasAnyAuthority('admin')")
    @PostMapping
    public ResponseEntity<User> create(@RequestBody UserDto userDto){
        return ResponseEntity.ok(userService.create(userDto));
    }

    @PreAuthorize("hasAnyAuthority('moderator','admin')")
    @PutMapping("/{userId}")
    public ResponseEntity<User> patchById(@PathVariable Long userId, @RequestBody UserDto userDto){
        return ResponseEntity.ok(userService.patchById(userId, userDto));
    }

    @PreAuthorize("hasAnyAuthority('moderator','admin')")
    @GetMapping("/{userId}")
    public ResponseEntity<User> findById(@PathVariable Long userId){
        return ResponseEntity.ok(userService.findById(userId));
    }

    @PreAuthorize("hasAnyAuthority('admin')")
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteById(@PathVariable Long userId){
        userService.deleteById(userId);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAnyAuthority('moderator','admin')")
    @GetMapping
    public ResponseEntity<List<User>> findAll(){
        return ResponseEntity.ok(userService.findAll());
    }

    @PostMapping("/me")
    public ResponseEntity<User> createMe(@RequestBody UserDto userDto){
        UserDto safeUserDto = new UserDto(
                userDto.nickname(),
                userDto.email(),
                userDto.password(),
                userDto.enabled(),
                Authority.USER.getId()
        );
        return ResponseEntity.ok(userService.create(safeUserDto));
    }

    @PreAuthorize("hasAnyAuthority('user','moderator','admin')")
    @GetMapping("/me")
    public ResponseEntity<User> findMe(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Long userId = Long.parseLong(userDetails.getUsername());
        return ResponseEntity.ok(userService.findById(userId));
    }

    @PreAuthorize("hasAnyAuthority('user','moderator','admin')")
    @PutMapping("/me")
    public ResponseEntity<User> patchMe(@RequestBody UserDto userDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Long userId = Long.parseLong(userDetails.getUsername());
        return ResponseEntity.ok(userService.patchById(userId, userDto));
    }
}
