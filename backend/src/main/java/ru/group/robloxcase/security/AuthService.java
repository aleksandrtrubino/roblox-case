package ru.group.robloxcase.security;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import ru.group.robloxcase.email.EmailConfirmation;
import ru.group.robloxcase.email.EmailConfirmationRepository;
import ru.group.robloxcase.exception.NotFoundException;
import ru.group.robloxcase.user.User;
import ru.group.robloxcase.user.UserRepository;
import ru.group.robloxcase.user.authority.Authority;


import java.util.Collection;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final UserDetailsServiceImpl userDetailsService;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final EmailConfirmationRepository emailConfirmationRepository;

    public AuthService(UserRepository userRepository, UserDetailsServiceImpl userDetailsService, JwtUtil jwtUtil, AuthenticationManager authenticationManager, EmailConfirmationRepository emailConfirmationRepository) {
        this.userRepository = userRepository;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.emailConfirmationRepository = emailConfirmationRepository;
    }


    public TokenDto openSession(HttpServletRequest request, HttpServletResponse response, AuthDto authDto){
        String email = authDto.email();
        String password = authDto.password();

        User user = userRepository.findByEmail(email)
                .orElseThrow(()->new NotFoundException(String.format("User with email %1$s not found",email)));
        String cookieName;
        if(user.getAuthorities().contains(Authority.USER)){
            EmailConfirmation emailConfirmation = emailConfirmationRepository.findByEmail(email)
                    .orElseThrow(()->new NotFoundException(String.format("EmailConfirmation for email %1$s not found",email)));

            if(!emailConfirmation.getIsConfirmed())
                throw new NotFoundException("Email is not confirmed");

            cookieName = "userRefreshToken";
        } else {
            cookieName = "adminRefreshToken";
        }
        String username = user.getUsername();

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password, authorities));

        String refreshToken = jwtUtil.generateRefreshToken(userDetails);

        Cookie cookie = new Cookie(cookieName, refreshToken);
        cookie.setMaxAge(jwtUtil.refreshTokenExpiration/1000);
        cookie.setPath("/");
        response.addCookie(cookie);

        String accessToken = jwtUtil.generateAccessToken(userDetails);

        return new TokenDto(accessToken);
    }

    public TokenDto extendSession(HttpServletRequest request){
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();
        if(cookies == null)
            throw new NotFoundException("Request does not include any cookies");
        for (Cookie c : cookies) {
            if (c.getName().equals("userRefreshToken") || c.getName().equals("adminRefreshToken"))
                refreshToken = c.getValue();
        }
        if(refreshToken == null )
            throw new NotFoundException("Cookie 'refreshToken' not found");

        String[] userIdAndAuthority = jwtUtil.getSubject(refreshToken).split(",");
        String username = userIdAndAuthority[0];
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        String accessToken = jwtUtil.generateAccessToken(userDetails);

        return new TokenDto(accessToken);
    }

    public void closeSession(HttpServletResponse response){
        Cookie refreshTokenCookie = new Cookie("refreshToken", null);
        refreshTokenCookie.setMaxAge(0);
        refreshTokenCookie.setPath("/");
        response.addCookie(refreshTokenCookie);
    }
}
