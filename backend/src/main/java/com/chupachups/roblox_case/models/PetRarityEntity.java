package com.chupachups.roblox_case.models;

import com.chupachups.roblox_case.models.enums.PetRarity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "pet_rarity")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class PetRarityEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private long id;

    @Column(nullable = false,unique = true)
    @Enumerated(EnumType.ORDINAL)
    private PetRarity rarity;
}
