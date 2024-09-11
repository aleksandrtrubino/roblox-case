package ru.group.robloxcase.user.authority;

import jakarta.persistence.*;

import java.util.Objects;


@Entity
@Table(name = "authorities")
public class Authority {

    public static final Authority USER = new Authority(3L, "user");
    public static final Authority MODERATOR = new Authority(2L, "moderator");
    public static final Authority ADMIN = new Authority(1L, "admin");

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Authority authority = (Authority) o;
        return Objects.equals(id, authority.id) && Objects.equals(name, authority.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
