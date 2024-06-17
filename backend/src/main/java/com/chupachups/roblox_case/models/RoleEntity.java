package com.chupachups.roblox_case.models;

import com.chupachups.roblox_case.models.enums.Role;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "role")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class RoleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false,unique = true)
    private Role name;

    @OneToMany(mappedBy = "role")
    private Set<UserEntity> users;
}
