package ru.group.robloxcase.contact;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import ru.group.robloxcase.contact.type.ContactType;
import ru.group.robloxcase.user.User;

@Entity
@Table(name = "contacts")
public class Contact {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "contacts_seq")
    Long id;

    @Column(name = "link")
    String link;

    @ManyToOne
    @JoinColumn(name = "type_id", referencedColumnName = "id")
    ContactType type;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    User user;

    public Contact() {
    }

    public Contact(String link, ContactType type, User user) {
        this.link = link;
        this.type = type;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public ContactType getType() {
        return type;
    }

    public void setType(ContactType type) {
        this.type = type;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
