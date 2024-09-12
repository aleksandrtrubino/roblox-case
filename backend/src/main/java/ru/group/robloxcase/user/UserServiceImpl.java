package ru.group.robloxcase.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import ru.group.robloxcase.balance.Balance;
import ru.group.robloxcase.balance.BalanceRepository;
import ru.group.robloxcase.contact.Contact;
import ru.group.robloxcase.contact.ContactRepository;
import ru.group.robloxcase.contact.type.ContactType;
import ru.group.robloxcase.email.EmailConfirmation;
import ru.group.robloxcase.email.EmailConfirmationRepository;
import ru.group.robloxcase.exception.NotFoundException;
import ru.group.robloxcase.exception.AlreadyExistsException;
import ru.group.robloxcase.inventory.Inventory;
import ru.group.robloxcase.inventory.InventoryRepository;
import ru.group.robloxcase.user.authority.Authority;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    //TODO: написать проверки при создании и изменении User (проверка всех id на null, regexp и тп)

    private final UserRepository userRepository;
    private final BalanceRepository balanceRepository;
    private final InventoryRepository inventoryRepository;
    private final EmailConfirmationRepository emailConfirmationRepository;
    private final ContactRepository contactRepository;

    private final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

    public UserServiceImpl(UserRepository userRepository, BalanceRepository balanceRepository, InventoryRepository inventoryRepository, EmailConfirmationRepository emailConfirmationRepository, ContactRepository contactRepository) {
        this.userRepository = userRepository;
        this.balanceRepository = balanceRepository;
        this.inventoryRepository = inventoryRepository;
        this.emailConfirmationRepository = emailConfirmationRepository;
        this.contactRepository = contactRepository;
    }

    @Transactional
    @Override
    public User create(UserDto userDto) {
        String nickname = userDto.nickname();
        if (userRepository.findByNickname(nickname).isPresent()) {
            throw new AlreadyExistsException(String.format("Nickname %1$s is taken", nickname));
        }

        String email = userDto.email();
        if (userRepository.findByEmail(email).isPresent()) {
            throw new AlreadyExistsException(String.format("Email %1$s is taken", email));
        }
        String password = userDto.password();
        String encodedPassword = new BCryptPasswordEncoder().encode(password);

        Boolean enabled = userDto.enabled();
        if (enabled == null) {
            enabled = true;
        }

        User user = new User(nickname, email, encodedPassword, enabled);

        // Save the User entity first to generate the ID
        user = userRepository.save(user);

        Long authorityId = userDto.authorityId();
        Authority authority;

        if (authorityId.equals(Authority.USER.getId())) {
            authority = Authority.USER;

            // Create and save Balance after User is saved
            Balance balance = new Balance(user, 0);
            balanceRepository.save(balance);

            // Create and save Inventory after User is saved
            Inventory inventory = new Inventory(user);
            inventoryRepository.save(inventory);

        } else if (authorityId.equals(Authority.MODERATOR.getId())) {
            authority = Authority.MODERATOR;
        } else if (authorityId.equals(Authority.ADMIN.getId())) {
            authority = Authority.ADMIN;
        } else {
            throw new NotFoundException(String.format("Authority with ID=%1$s not found", authorityId));
        }

        user.getAuthorities().add(authority);

        EmailConfirmation emailConfirmation = new EmailConfirmation(user, user.getEmail());

        Long contactTypeId = userDto.contactTypeId();
        String contactLink = userDto.contactLink();
        ContactType contactType;
        if(contactTypeId.equals(ContactType.TELEGRAM.getId())) {
            contactType = ContactType.TELEGRAM;
        } else if (contactTypeId.equals(ContactType.DISCORD.getId())) {
            contactType = ContactType.DISCORD;
        } else if (contactTypeId.equals(ContactType.VK.getId())) {
            contactType = ContactType.VK;
        } else if (contactTypeId.equals(ContactType.WHATSAPP.getId())) {
            contactType = ContactType.WHATSAPP;
        } else {
            throw new NotFoundException(String.format("ContactType with ID=%1$s not found", authorityId));
        }
        Contact contact = new Contact(contactLink, contactType, user);

        contactRepository.save(contact);
        emailConfirmationRepository.save(emailConfirmation);
        return userRepository.save(user);
    }

    @Transactional
    @Override
    public User patchById(Long userId, UserDto userDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(String.format("User with id %1$s not found", userId)));

        String nickname = userDto.nickname();
        String email = userDto.email();
        String password = userDto.password();
        Boolean enabled = userDto.enabled();
        Long authorityId = userDto.authorityId();
        String contactLink = userDto.contactLink();
        Long contactTypeId = userDto.contactTypeId();

        if (nickname != null && !nickname.equals(user.getNickname())) {
            if (userRepository.findByNickname(nickname).isPresent()) {
                throw new AlreadyExistsException(String.format("Nickname %1$s is taken", nickname));
            }
            user.setNickname(nickname);
        }

        if (email != null && !email.equals(user.getEmail())) {
            if (userRepository.findByEmail(email).isPresent()) {
                throw new AlreadyExistsException(String.format("Email %1$s is taken", email));
            }
            user.setEmail(email);
            EmailConfirmation emailConfirmation = new EmailConfirmation(user, user.getEmail());
            emailConfirmationRepository.save(emailConfirmation);
        }

        if (password != null) {
            String encodedPassword = new BCryptPasswordEncoder().encode(password);
            user.setPassword(encodedPassword);
        }

        if (enabled != null) {
            user.setEnabled(enabled);
        }

        if (authorityId != null) {
            Authority authority;
            if (authorityId.equals(Authority.USER.getId())) {
                authority = Authority.USER;
            } else if (authorityId.equals(Authority.MODERATOR.getId())) {
                authority = Authority.MODERATOR;
            } else if (authorityId.equals(Authority.ADMIN.getId())) {
                authority = Authority.ADMIN;
            } else {
                throw new NotFoundException(String.format("Authority with ID=%1$s not found", authorityId));
            }
            user.getAuthorities().clear();
            user.getAuthorities().add(authority);
        }

        if (contactTypeId != null && contactLink != null) {
            ContactType contactType;
            if (contactTypeId.equals(ContactType.TELEGRAM.getId())) {
                contactType = ContactType.TELEGRAM;
            } else if (contactTypeId.equals(ContactType.DISCORD.getId())) {
                contactType = ContactType.DISCORD;
            } else if (contactTypeId.equals(ContactType.VK.getId())) {
                contactType = ContactType.VK;
            } else if (contactTypeId.equals(ContactType.WHATSAPP.getId())) {
                contactType = ContactType.WHATSAPP;
            } else {
                throw new NotFoundException(String.format("ContactType with ID=%1$s not found", contactTypeId));
            }

            Contact contact = contactRepository.findByUserId(userId).orElseThrow(() ->
                    new NotFoundException("Contact not found for user with id " + userId));

            contact.setLink(contactLink);
            contact.setType(contactType);
            contactRepository.save(contact);
        }

        return userRepository.save(user);
    }


    @Override
    public User findById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(()->new NotFoundException(String.format("User with id %1$s not found",userId)));
    }

    @Transactional
    @Override
    public void deleteById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(String.format("User with id %1$s not found", userId)));
        balanceRepository.deleteByUserId(userId);
        inventoryRepository.deleteByUserId(userId);
        emailConfirmationRepository.deleteByUserId(userId);
        contactRepository.deleteByUserId(userId);
        userRepository.deleteById(userId);
    }


    @Override
    public List<User> findAll(Long authorityId, String search) {
        Specification<User> spec = Specification.where(null);

        // Фильтр по authorityId, если он не null
        if (authorityId != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.join("authorities").get("id"), authorityId)
            );
        }

        // Фильтр по nickname, если строка поиска не пуста
        if (StringUtils.hasText(search)) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(root.get("nickname"), "%" + search + "%")
            );
        }

        return userRepository.findAll(spec);
    }
}
