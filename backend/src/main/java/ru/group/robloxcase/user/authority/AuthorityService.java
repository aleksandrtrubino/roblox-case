package ru.group.robloxcase.user.authority;

import java.util.List;

public interface AuthorityService {
    Authority create(AuthorityDto authorityDto);
    Authority patchById(Long authorityId, AuthorityDto authorityDto);
    Authority findById(Long authorityId);
    void deleteById(Long authorityId);

    List<Authority> findAll();

    void grantAuthorityToUser(Long authorityId, Long userId);
    void revokeAuthorityFromUser(Long authorityId, Long userId);

}
