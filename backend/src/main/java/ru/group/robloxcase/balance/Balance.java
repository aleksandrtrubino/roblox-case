package ru.group.robloxcase.balance;

import jakarta.persistence.*;
import ru.group.robloxcase.user.User;

@Entity
@Table(name = "balance")
public class Balance {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "balance_seq")
    @Column(name = "id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(name = "balance")
    private Integer balance;

    public Balance () {}

    public Balance(User user, Integer balance) {
        this.user = user;
        this.balance = balance;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getBalance() {
        return balance;
    }

    public void setBalance(Integer balance) {
        this.balance = balance;
    }
}
