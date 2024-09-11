package ru.group.robloxcase.contact.type;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "contact_types")
public class ContactType {

    public static  final ContactType TELEGRAM = new ContactType(1L, "Telegram");
    public static  final ContactType DISCORD = new ContactType(2L, "Discord");
    public static  final ContactType VK = new ContactType(3L, "VK");
    public static  final ContactType WHATSAPP = new ContactType(4L, "WhatsApp");

    @Id
    @Column(name = "id")
    Long id;

    @Column(name = "name")
    String name;

    public ContactType() {
    }

    public ContactType(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
