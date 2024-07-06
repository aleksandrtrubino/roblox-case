package ru.group.robloxcase.box;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/boxes")
public class BoxController {

    private final BoxService boxService;

    public BoxController(BoxService boxService) {
        this.boxService = boxService;
    }

    @PreAuthorize("hasAnyAuthority('moderator','admin')")
    @PostMapping
    public ResponseEntity<Box> create(@RequestBody BoxDto boxDto) {
        Box createdBox = boxService.create(boxDto);
        return ResponseEntity.ok(createdBox);
    }

    @PreAuthorize("hasAnyAuthority('moderator','admin')")
    @PatchMapping("/{boxId}")
    public ResponseEntity<Box> patchById(@PathVariable Long boxId, @RequestBody BoxDto boxDto) {
        Box updatedBox = boxService.patchById(boxId, boxDto);
        return ResponseEntity.ok(updatedBox);
    }

    @PreAuthorize("hasAnyAuthority('user','moderator','admin')")
    @GetMapping("/{boxId}")
    public ResponseEntity<Box> findById(@PathVariable Long boxId) {
        Box box = boxService.findById(boxId);
        return ResponseEntity.ok(box);
    }

    @PreAuthorize("hasAnyAuthority('moderator','admin')")
    @DeleteMapping("/{boxId}")
    public ResponseEntity<Void> deleteById(@PathVariable Long boxId) {
        boxService.deleteById(boxId);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAnyAuthority('user','moderator','admin')")
    @GetMapping
    public ResponseEntity<List<Box>> findAll() {
        List<Box> boxes = boxService.findAll();
        return ResponseEntity.ok(boxes);
    }
}
