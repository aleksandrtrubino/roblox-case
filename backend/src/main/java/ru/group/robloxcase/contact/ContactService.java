package ru.group.robloxcase.contact;

import java.util.List;

public interface ContactService {
    Contact findByUserId(Long userId);
    List<Contact> findAll();
}
