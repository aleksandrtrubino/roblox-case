package com.chupachups.roblox_case.models;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Set;

@Entity
@Table(name = "container")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ContainerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private long id;

    @Column(nullable = false,unique = true)
    private String name;

    @Column(nullable = false)
    private BigDecimal cost;

    @ManyToMany(mappedBy = "cases")
    private Set<PetEntity> pets;
}
