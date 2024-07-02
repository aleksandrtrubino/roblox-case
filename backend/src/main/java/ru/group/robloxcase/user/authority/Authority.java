package ru.group.robloxcase.user.authority;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import ru.group.robloxcase.user.User;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "authorities")
public class Authority {

    public static final Authority USER = new Authority(1L, "user");
    public static final Authority MODERATOR = new Authority(2L, "moderator");
    public static final Authority ADMIN = new Authority(3L, "admin");

    @Id
    @Column(name = "id")
    private Long id;
    @Column(name = "name")
    private String name;

    public Authority() {}

    public Authority(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
