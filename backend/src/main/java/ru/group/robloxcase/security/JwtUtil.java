package ru.group.robloxcase.security;


import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import ru.group.robloxcase.user.authority.Authority;

import java.security.Key;
import java.util.Date;

@Service
public class JwtUtil {

    @Value("${security.key}")
    private String secretKey;
    @Value("${security.expiration.refresh-token}")
    public int refreshTokenExpiration;
    @Value("${security.expiration.access-token}")
    public int accessTokenExpiration;

    private Key signingKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
    }

    public String getSubject(String token) throws JwtException {
        return Jwts
                .parserBuilder()
                .setSigningKey(signingKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    private String generateToken(UserDetails userDetails, int expiration){
        String userId = userDetails.getUsername();
        String authorityName = ((SimpleGrantedAuthority) userDetails.getAuthorities().toArray()[0]).getAuthority();
        return Jwts
                .builder()
                .setSubject(userId + "," + authorityName)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(signingKey())
                .compact();
    }

    public String generateRefreshToken(UserDetails userDetails){
        return generateToken(userDetails, refreshTokenExpiration);
    }

    public String generateAccessToken(UserDetails userDetails){
        return generateToken(userDetails, accessTokenExpiration);
    }

}