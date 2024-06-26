package ru.group.robloxcase.user;

import java.util.List;


public interface UserService {

    User create(UserDto user, Long authorityId);
    User patchById(Long userId, UserDto userDto);
    User findById(Long userId);
    void deleteById(Long userId);

    List<User> findAll();

}
