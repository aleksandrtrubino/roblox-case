package com.chupachups.roblox_case.models;

import com.chupachups.roblox_case.models.enums.PetType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "pet_type")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class PetTypeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private long id;

    @Column(nullable = false,unique = true)
    @Enumerated(EnumType.ORDINAL)
    private PetType type;
}
