package com.chupachups.roblox_case.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "jwt")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class JwtEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;
    @Builder.Default
    private boolean isRevoked = false;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
