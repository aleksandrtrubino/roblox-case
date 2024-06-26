package ru.group.robloxcase.user.authority;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/authorities")
public class AuthorityController {

    AuthorityService authorityService;

    public AuthorityController(AuthorityService authorityService) {
        this.authorityService = authorityService;
    }

    @PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
    @PostMapping
    public ResponseEntity<Authority> create(@RequestBody AuthorityDto authorityDto){
        return ResponseEntity.ok(authorityService.create(authorityDto));
    }

    @PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
    @PutMapping("/{authorityId}")
    public ResponseEntity<Authority> patchById(@PathVariable Long authorityId, @RequestBody AuthorityDto authorityDto){
        return ResponseEntity.ok(authorityService.patchById(authorityId,authorityDto));
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_SUPER_ADMIN')")
    @GetMapping("/{authorityId}")
    public ResponseEntity<Authority> findById(@PathVariable Long authorityId){
        return ResponseEntity.ok(authorityService.findById(authorityId));
    }

    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN')")
    @DeleteMapping("/{authorityId}")
    public ResponseEntity<Void> deleteById(@PathVariable Long authorityId){
        authorityService.deleteById(authorityId);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_SUPER_ADMIN')")
    @GetMapping
    public ResponseEntity<List<Authority>> findAll(){
        return ResponseEntity.ok(authorityService.findAll());
    }

    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN')")
    @PostMapping("/{authorityId}/users/{userId}")
    public ResponseEntity<Void> grantAuthorityToUser(@PathVariable Long authorityId, @PathVariable Long userId){
        authorityService.grantAuthorityToUser(authorityId, userId);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN')")
    @DeleteMapping("/{authorityId}/users/{userId}")
    public ResponseEntity<Void> revokeAuthorityFromUser(@PathVariable Long authorityId, @PathVariable Long userId){
        authorityService.revokeAuthorityFromUser(authorityId, userId);
        return ResponseEntity.ok().build();
    }

}
