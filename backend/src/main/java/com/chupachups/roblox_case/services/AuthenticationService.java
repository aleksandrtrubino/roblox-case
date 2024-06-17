package com.chupachups.roblox_case.services;

import com.chupachups.roblox_case.dtos.auth.LoginDto;
import com.chupachups.roblox_case.dtos.auth.RegisterDto;
import com.chupachups.roblox_case.dtos.token.TokenDto;
import com.chupachups.roblox_case.exceptions.ResourceAlreadyExist;
import com.chupachups.roblox_case.exceptions.RevokedOrExpiredTokenException;
import com.chupachups.roblox_case.mappers.UserMapper;
import com.chupachups.roblox_case.models.UserEntity;
import com.chupachups.roblox_case.models.enums.Role;
import com.chupachups.roblox_case.repositories.RoleRepository;
import com.chupachups.roblox_case.repositories.UserRepository;
import io.jsonwebtoken.io.Decoders;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthenticationService {
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;
    private static final String PREFIX = "Bearer ";


    public TokenDto register(RegisterDto registerDto, HttpServletResponse response) {
        if (userRepository.existsByUsername(registerDto.username())) {
            throw new ResourceAlreadyExist("username already exists");
        }
        if (registerDto.email() != null && userRepository.existsByEmail(registerDto.email())) {
            throw new ResourceAlreadyExist("email already exists");
        }
        var user = userMapper.toEntity(registerDto);
        final var role = roleRepository.findByName(Role.ROLE_USER).orElseThrow();
        user.setRole(role);
        user.setActive(true);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setIsEmailConfirmed(false);
        user.setBalance(new BigDecimal(0));
        user = userRepository.save(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        jwtService.saveUserToken(refreshToken, user);
        response.addCookie(jwtService.getRefreshCookie(refreshToken));
        return new TokenDto(jwtService.generateAccessToken(user));
    }

    public TokenDto login(
            LoginDto loginDto,
            HttpServletResponse response
    ) {
        var user = userRepository.findByUsername(loginDto.username())
                .filter(UserEntity::isEnabled)
                .orElseThrow(
                        () -> new UsernameNotFoundException("user not found")
                );
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.username(),
                        loginDto.password()
                )
        );
        jwtService.revokeAllUserToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        jwtService.saveUserToken(refreshToken, user);
        response.addCookie(jwtService.getRefreshCookie(refreshToken));
        return new TokenDto(jwtService.generateAccessToken(user));
    }

    public void logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION).replace(PREFIX, "");
        var user = userRepository.findByUsername(jwtService.extractUsername(token)).orElseThrow();
        jwtService.revokeAllUserToken(user);
        SecurityContextHolder.clearContext();

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refresh_token".equals(cookie.getName())) {
                    cookie.setMaxAge(0);
                    response.addCookie(cookie);
                }
            }
        }
        response.setContentType("text/plain");
        response.getWriter().write("user successfully logout");
    }

    public TokenDto refresh(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refresh_token".equals(cookie.getName())) {
                    final var decodedRefreshToken = new String(Decoders.BASE64.decode(cookie.getValue()));
                    if (jwtService.isTokenRevoked(decodedRefreshToken)) {
                        cookie.setMaxAge(0);
                        response.addCookie(cookie);
                        throw new RevokedOrExpiredTokenException("token revoked");
                    } else {
                        var user = userRepository.findByUsername(jwtService.extractUsername(decodedRefreshToken))
                                .orElseThrow();
                        jwtService.revokeAllUserToken(user);
                        var refreshToken = jwtService.generateRefreshToken(user);
                        jwtService.saveUserToken(refreshToken, user);
                        response.addCookie(jwtService.getRefreshCookie(refreshToken));
                        return new TokenDto(jwtService.generateAccessToken(user));
                    }
                }
            }
        }
        throw new IllegalArgumentException("no token has presented");
    }

    public String confirmEmail(String email) {
        final var user = userRepository.findByEmail(email).orElseThrow(
                () -> new EntityNotFoundException("user not found")
        );
        user.setIsEmailConfirmed(true);
        return "email " + email + " confirmed";
    }

}
