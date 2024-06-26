package ru.group.robloxcase.security;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import ru.group.robloxcase.exception.NotFoundException;
import ru.group.robloxcase.user.User;
import ru.group.robloxcase.user.UserRepository;


import java.util.Collection;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final UserDetailsServiceImpl userDetailsService;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, UserDetailsServiceImpl userDetailsService, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }


    public TokenDto openSession(HttpServletRequest request, HttpServletResponse response, AuthDto authDto){
        String email = authDto.email();
        String password = authDto.password();

        User user = userRepository.findByEmail(email)
                .orElseThrow(()->new NotFoundException(String.format("User with id %1$s not found",email)));
        String username = user.getUsername();

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password, authorities));

        String refreshToken = jwtUtil.generateRefreshToken(userDetails);

        Cookie cookie = new Cookie("refreshToken", refreshToken);
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
            if (c.getName().equals("refreshToken"))
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
