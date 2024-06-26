package ru.group.robloxcase.user.authority;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import ru.group.robloxcase.user.User;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "authorities")
public class Authority {

    public static final Long ROLE_USER = 135L;
    public static final Long ROLE_ADMIN = 247L;
    public static final Long ROLE_SUPER_ADMIN = 692L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "authorities_seq")
    @Column(name = "id")
    private Long id;
    @Column(name = "name")
    private String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "authorities", fetch = FetchType.LAZY)
    private Set<User> users;

    public Authority() {}

    public Authority(String name) {
        this.name = name;
        this.users = new HashSet<>();
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

    public Set<User> getUsers() {
        return users;
    }

}
