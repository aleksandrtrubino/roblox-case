package com.chupachups.roblox_case.services;


import com.chupachups.roblox_case.models.JwtEntity;
import com.chupachups.roblox_case.models.UserEntity;
import com.chupachups.roblox_case.repositories.JwtRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwsHeader;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {
    @Value("${jwt.signing-key}")
    private String signingKey;

    @Value("${jwt.expiration.access-token}")
    private long accessTokenExpiration;

    @Value("${jwt.expiration.refresh-token}")
    private long refreshTokenExpiration;


    private final JwtRepository jwtRepository;


    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public JwsHeader extractHeader(String token) {
        return Jwts
                .parser()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getHeader();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        return claimsResolver.apply(extractAllClaims(token));
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }


    public String generateAccessToken(UserDetails userDetails) {
        return buildToken(new HashMap<>(), userDetails, accessTokenExpiration);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return buildToken(new HashMap<>(), userDetails, refreshTokenExpiration);
    }

    private String buildToken(Map<String, Object> extraClaims,
                              UserDetails userDetails,
                              Long expiration) {
        return Jwts
                .builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails user) {
        return (extractUsername(token).equals(user.getUsername())
                && !extractExpiration(token).before(new Date()));
    }

    public Cookie getRefreshCookie(String token) {
        Cookie refreshCookie = new Cookie("refresh_token", Encoders.BASE64.encode(token.getBytes()));
        refreshCookie.setHttpOnly(true);
        refreshCookie.setMaxAge((int) refreshTokenExpiration);
        refreshCookie.setPath("/");
        refreshCookie.setSecure(true);
        return refreshCookie;
    }


    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(signingKey));
    }

    @Transactional
    public void revokeAllUserToken(UserEntity user) {
        final var tokens =jwtRepository.findAllValidTokensByUser(user.getId());
        tokens.forEach(
                t-> {
                    t.setRevoked(true);
                    jwtRepository.save(t);
                }
        );
    }

    @Transactional
    public void saveUserToken(String token, UserEntity user) {
        jwtRepository.save(
                JwtEntity.builder()
                        .token(token)
                        .user(user)
                        .build()
        );
    }


    @Transactional(readOnly = true)
    public boolean isTokenRevoked(String token) {
        return jwtRepository.findByToken(token).stream().allMatch(JwtEntity::isRevoked);
    }

}
