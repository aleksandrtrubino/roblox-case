package com.chupachups.roblox_case.services;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
@Slf4j
public class CustomSecurityExpression {

    public boolean userHasPermission(final String username){
        final var principal = (UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return username.equals(principal.getUsername())||principal.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
    }
}
