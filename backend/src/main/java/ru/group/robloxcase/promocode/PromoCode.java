package ru.group.robloxcase.promocode;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import ru.group.robloxcase.promocode.type.PromoCodeType;
import ru.group.robloxcase.user.User;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "promo_codes")
public class PromoCode {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "promo_codes_seq")
    @Column(name = "id")
    Long id;

    @Column(name = "code")
    String code;

    @Column(name = "number")
    Integer number;

    @ManyToOne
    @JoinColumn(name = "type_id", referencedColumnName = "id")
    PromoCodeType type;

    @Column(name = "uses_left")
    Integer usesNumber;

//    @ManyToMany(fetch = FetchType.EAGER)
//    @JoinTable(name = "users_authorities",
//            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
//            inverseJoinColumns = @JoinColumn(name = "authority_id", referencedColumnName = "id"))
//    private Set<Authority> authorities;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "promo_codes_users",
    joinColumns = @JoinColumn(name = "promo_code_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    List<User> users;

    public PromoCode() {
    }

    public PromoCode(String code, Integer number, PromoCodeType type, Integer usesNumber) {
        this.code = code;
        this.number = number;
        this.type = type;
        this.usesNumber = usesNumber;
        this.users = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public PromoCodeType getType() {
        return type;
    }

    public void setType(PromoCodeType type) {
        this.type = type;
    }

    public Integer getUsesNumber() {
        return usesNumber;
    }

    public void setUsesNumber(Integer usesLeft) {
        this.usesNumber = usesLeft;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
