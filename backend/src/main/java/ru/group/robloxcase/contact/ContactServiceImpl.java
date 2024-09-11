package ru.group.robloxcase.contact;

import org.springframework.stereotype.Service;
import ru.group.robloxcase.exception.NotFoundException;

import java.util.List;

@Service
public class ContactServiceImpl implements ContactService{

    ContactRepository contactRepository;

    public ContactServiceImpl(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Override
    public Contact findByUserId(Long userId) {
        return contactRepository.findByUserId(userId)
                .orElseThrow(()->new NotFoundException(String.format("Contact for user with id %1$s not found",userId)));
    }

    @Override
    public List<Contact> findAll() {
        return contactRepository.findAll();
    }
}
