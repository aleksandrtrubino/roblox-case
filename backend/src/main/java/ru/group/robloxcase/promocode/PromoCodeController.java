package ru.group.robloxcase.promocode;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/promo-codes")
public class PromoCodeController {

    private final PromoCodeService promoCodeService;

    public PromoCodeController(PromoCodeService promoCodeService) {
        this.promoCodeService = promoCodeService;
    }

    @PreAuthorize("hasAnyAuthority('admin')")
    @PostMapping
    public ResponseEntity<PromoCode> create(@RequestBody PromoCodeDto promoCodeDto) {
        return ResponseEntity.ok(promoCodeService.create(promoCodeDto));
    }

    @PreAuthorize("hasAnyAuthority('moderator','admin')")
    @PutMapping("/{promoCodeId}")
    public ResponseEntity<PromoCode> patchById(@PathVariable Long promoCodeId, @RequestBody PromoCodeDto promoCodeDto) {
        return ResponseEntity.ok(promoCodeService.patchById(promoCodeId, promoCodeDto));
    }

    @PreAuthorize("hasAnyAuthority('moderator','admin')")
    @GetMapping("/{promoCodeId}")
    public ResponseEntity<PromoCode> findById(@PathVariable Long promoCodeId) {
        return ResponseEntity.ok(promoCodeService.findById(promoCodeId));
    }

    @PreAuthorize("hasAnyAuthority('admin')")
    @DeleteMapping("/{promoCodeId}")
    public ResponseEntity<Void> deleteById(@PathVariable Long promoCodeId) {
        promoCodeService.deleteById(promoCodeId);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAnyAuthority('moderator','admin')")
    @GetMapping
    public ResponseEntity<List<PromoCode>> findAll() {
        return ResponseEntity.ok(promoCodeService.findAll());
    }

    @PreAuthorize("hasAnyAuthority('user','moderator','admin')")
    @GetMapping("/by-code/{code}")
    public ResponseEntity<PromoCode> findByCode(@PathVariable String code) {
        return ResponseEntity.ok(promoCodeService.findByCode(code));
    }
}
