package ru.group.robloxcase.user.authority;

import org.springframework.stereotype.Service;
import ru.group.robloxcase.exception.NotFoundException;
import ru.group.robloxcase.user.User;
import ru.group.robloxcase.user.UserRepository;

import java.util.List;

@Service
public class AuthorityServiceImpl implements AuthorityService {

    private final AuthorityRepository authorityRepository;
    private final UserRepository userRepository;

    public AuthorityServiceImpl(AuthorityRepository authorityRepository, UserRepository userRepository) {
        this.authorityRepository = authorityRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Authority create(AuthorityDto authorityDto) {
        String name = authorityDto.name();
        Authority authority = new Authority(name);
        return authorityRepository.save(authority);
    }

    @Override
    public Authority patchById(Long authorityId, AuthorityDto authorityDto) {
        return null;
    }

    @Override
    public Authority findById(Long authorityId) {
        return authorityRepository.findById(authorityId)
                .orElseThrow(()->new NotFoundException(String.format("Authority with id %1$s not found",authorityId)));
    }

    @Override
    public void deleteById(Long authorityId) {
        authorityRepository.deleteById(authorityId);
    }

    @Override
    public List<Authority> findAll() {
        return authorityRepository.findAll();
    }

    @Override
    public void grantAuthorityToUser(Long authorityId, Long userId) {
        Authority authority = authorityRepository.findById(authorityId)
                .orElseThrow(()->new NotFoundException(String.format("Authority with id %1$s not found",authorityId)));
        User user = userRepository.findById(userId)
                .orElseThrow(()->new NotFoundException(String.format("User with id %1$s not found",userId)));
        authority.getUsers().clear();
        authority.getUsers().add(user);
        authorityRepository.save(authority);
    }

    @Override
    public void revokeAuthorityFromUser(Long authorityId, Long userId) {
        Authority authority = authorityRepository.findById(authorityId)
                .orElseThrow(()->new NotFoundException(String.format("Authority with id %1$s not found",authorityId)));
        User user = userRepository.findById(userId)
                .orElseThrow(()->new NotFoundException(String.format("User with id %1$s not found",userId)));
        authority.getUsers().remove(user);
        authorityRepository.save(authority);
    }
}
