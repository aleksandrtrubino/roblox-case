package ru.group.robloxcase.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.group.robloxcase.exception.NotFoundException;
import ru.group.robloxcase.exception.AlreadyExistsException;
import ru.group.robloxcase.user.authority.Authority;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    //TODO: написать проверки при создании и изменении User (проверка всех id на null, regexp и тп)

    private final UserRepository userRepository;

    private final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User create(UserDto userDto) {
        String nickname = userDto.nickname();
        if(userRepository.findByNickname(nickname).isPresent())
            throw new AlreadyExistsException(String.format("Nickname %1$s is taken",nickname));
        String email = userDto.email();
        if(userRepository.findByEmail(email).isPresent())
            throw new AlreadyExistsException(String.format("Email %1$s is taken",email));
        String password = userDto.password();
        String encodedPassword = new BCryptPasswordEncoder().encode(password);
        Boolean enabled = userDto.enabled();
        if(enabled == null)
            enabled = true;
        User user = new User(nickname,email, encodedPassword, enabled);
        Long authorityId = userDto.authorityId();
        Authority authority;
        if(authorityId.equals(Authority.USER.getId()))
            authority = Authority.USER;
        else if(authorityId.equals(Authority.MODERATOR.getId()))
            authority = Authority.MODERATOR;
        else if(authorityId.equals(Authority.ADMIN.getId())) {
            authority = Authority.ADMIN;
        }
        else
            throw new NotFoundException(String.format("Authority with ID=%1$s not found", authorityId));
        user.getAuthorities().add(authority);
        return userRepository.save(user);
    }

    @Override
    public User patchById(Long userId, UserDto userDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(()->new NotFoundException(String.format("User with id %1$s not found",userId)));
        String nickname = userDto.nickname();
        String email = userDto.email();
        String password = userDto.password();
        String encodedPassword;
        Boolean enabled = userDto.enabled();
        Long authorityId = userDto.authorityId();
        if(nickname != null) {
            if (userRepository.findByNickname(nickname).isPresent())
                throw new AlreadyExistsException(String.format("Nickname %1$s is taken", nickname));
            user.setNickname(nickname);
        }
        if(email != null) {
            if (userRepository.findByEmail(email).isPresent())
                throw new AlreadyExistsException(String.format("Email %1$s is taken", email));
            user.setEmail(email);
        }
        if(password != null) {
            encodedPassword = new BCryptPasswordEncoder().encode(password);
            user.setPassword(encodedPassword);
        }
        if(enabled != null)
            user.setEnabled(enabled);
        if(authorityId != null){
            Authority authority;
            if(authorityId.equals(Authority.USER.getId()))
                authority = Authority.USER;
            else if(authorityId.equals(Authority.MODERATOR.getId()))
                authority = Authority.MODERATOR;
            else if(authorityId.equals(Authority.ADMIN.getId())) {
                authority = Authority.ADMIN;
            }
            else
                throw new NotFoundException(String.format("Authority with ID=%1$s not found", authorityId));
            user.getAuthorities().clear();
            user.getAuthorities().add(authority);
        }
        return userRepository.save(user);
    }

    @Override
    public User findById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(()->new NotFoundException(String.format("User with id %1$s not found",userId)));
    }

    @Override
    public void deleteById(Long userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }
}
