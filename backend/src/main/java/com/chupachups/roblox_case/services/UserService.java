package com.chupachups.roblox_case.services;

import com.chupachups.roblox_case.dtos.token.TokenDto;
import com.chupachups.roblox_case.dtos.user.UserInfoDto;
import com.chupachups.roblox_case.dtos.user.UserUpdateInfoDto;
import com.chupachups.roblox_case.mappers.PetMapper;
import com.chupachups.roblox_case.mappers.UserMapper;
import com.chupachups.roblox_case.repositories.ContainerRepository;
import com.chupachups.roblox_case.repositories.PetRepository;
import com.chupachups.roblox_case.repositories.UserRepository;
import com.chupachups.roblox_case.services.telegram.BotService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final PetRepository petRepository;
    private final ContainerRepository containerRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final PetMapper petMapper;
    private final JwtService jwtService;
    private final BotService botService;
    private final ObjectMapper objectMapper;


    @Transactional(readOnly = true)
    public UserInfoDto getUser(String username) {
        return userMapper.toDto(userRepository.findByUsername(username).orElseThrow(
                        () -> new EntityNotFoundException("User with username " + username + " not found")
                )
        );
    }

    public TokenDto updateUser(String username, UserUpdateInfoDto userUpdateInfoDto,
                               HttpServletResponse response) {
        final var user = userRepository.findByUsername(username).orElseThrow(
                () -> new EntityNotFoundException("User not found")
        );
        jwtService.revokeAllUserToken(user);
        if (userUpdateInfoDto.username() != null) {
            if (
                    userUpdateInfoDto.username().trim().isEmpty() ||
                            userRepository.existsByUsername(userUpdateInfoDto.username())
            )
                throw new IllegalArgumentException("Invalid Username");
            user.setUsername(userUpdateInfoDto.username());
        }
        if (userUpdateInfoDto.email() != null) {
            if (
                    userUpdateInfoDto.email().trim().isEmpty() ||
                            userRepository.existsByEmail(userUpdateInfoDto.email())
            )
                throw new IllegalArgumentException("Invalid Email");
            user.setIsEmailConfirmed(false);
            user.setEmail(userUpdateInfoDto.email());
        }
        if (userUpdateInfoDto.oldPassword() != null && userUpdateInfoDto.newPassword() != null) {
            if (!passwordEncoder.matches(userUpdateInfoDto.oldPassword(), user.getPassword())) {
                throw new IllegalArgumentException("Invalid old password");
            }
            if (userUpdateInfoDto.newPassword().trim().isEmpty()) {
                throw new IllegalArgumentException("Invalid new password");
            }
            user.setPassword(passwordEncoder.encode(userUpdateInfoDto.newPassword()));
        }
        var refreshToken = jwtService.generateRefreshToken(user);
        jwtService.saveUserToken(refreshToken, user);
        response.addCookie(jwtService.getRefreshCookie(refreshToken));
        return new TokenDto(jwtService.generateAccessToken(user));
    }

    public String deleteUser(String username, HttpServletRequest request, HttpServletResponse response) {
        userRepository.delete(userRepository.findByUsername(username).orElseThrow(
                () -> new EntityNotFoundException("User not found")
        ));
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refresh_token".equals(cookie.getName())) {
                    cookie.setMaxAge(0);
                    response.addCookie(cookie);
                }
            }
        }
        return "user successfully deleted";
    }

    public UserInfoDto sellPet(String username, long petId) {
        var user = userRepository.findByUsername(username).orElseThrow(
                () -> new EntityNotFoundException("User not found")
        );
        var pet = petRepository.findById(petId).orElseThrow(
                () -> new EntityNotFoundException("Pet not found")
        );
        if (pet.getUsers().removeIf(userIn -> userIn.getId().equals(user.getId()))) {
            user.setBalance(user.getBalance().add(pet.getCost()));
        } else {
            throw new IllegalArgumentException("You don't have this pet");
        }

        return userMapper.toDto(user);
    }

    public String buyCase(String username, long id) {
        final var user = userRepository.findByUsername(username).orElseThrow(
                () -> new EntityNotFoundException("User not found")
        );
        final var c = containerRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Case " + id + " not found")
        );
        if (user.getBalance().compareTo(c.getCost()) >= 0) {
            user.setBalance(user.getBalance().subtract(c.getCost()));
            return "case " + id + " successfully bought for " + username + " user";
        } else {
            throw new IllegalArgumentException("Balance < cost");
        }
    }

    public String banUser(String username) {
        final var user = userRepository.findByUsername(username).orElseThrow(
                () -> new EntityNotFoundException("user not found")
        );
        user.setActive(false);
        jwtService.revokeAllUserToken(user);
        return "user " + username + " has been banned";
    }

    public String unbanUser(String username) {
        final var user = userRepository.findByUsername(username).orElseThrow(
                () -> new EntityNotFoundException("user not found")
        );
        user.setActive(true);
        jwtService.revokeAllUserToken(user);
        return "user " + username + " has been unbanned";
    }

    public String exchangePet(String text, List<Long> pets, String username) throws JsonProcessingException {
        final var user = userRepository.findByUsername(username).orElseThrow(
                () -> new EntityNotFoundException("User not found")
        );
        for (var id : pets) {
            var pet = petRepository.findById(id).orElseThrow(
                    () -> new EntityNotFoundException("Pet " + id + " not found")
            );
            if (!pet.getUsers().removeIf(userIn -> userIn.getId().equals(user.getId()))) {
                throw new IllegalArgumentException("User " + username + " don't have pet " + id);
            }
        }
        botService.sendMessage(
                text + "\n" +
                        "```json\n" +
                        "{\n\t" +
                        "\"petIds\":" +
                        "\n\t[" +
                        pets.stream().map(pet -> "\n\t\t" + pet + ",").collect(Collectors.joining()) +
                        "\n\t]" +
                        "\n}" +
                        "```"
        );
        return "pet successfully exchanged";
    }

    public String addPet(String username, long id) {
        final var user = userRepository.findByUsername(username).orElseThrow(
                () -> new EntityNotFoundException("User not found")
        );
        final var pet = petRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Pet " + id + " not found")
        );

        pet.getUsers().add(user);
        return "Pet " + id + " added to user " + username;
    }

    public UserInfoDto growthBalance(String username, BigDecimal growth) {
        final var user = userRepository.findByUsername(username).orElseThrow(
                () -> new EntityNotFoundException("User not found")
        );
        if (growth.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Growth equal or less than zero");
        }
        user.setBalance(user.getBalance().add(growth));
        return userMapper.toDto(user);
    }
}
