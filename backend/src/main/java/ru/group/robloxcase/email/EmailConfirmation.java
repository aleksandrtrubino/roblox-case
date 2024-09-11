package ru.group.robloxcase.email;

import jakarta.persistence.*;
import ru.group.robloxcase.user.User;

@Entity
@Table(name = "email_confirmation")
public class EmailConfirmation {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "email_confirmation_seq")
    @Column(name = "id")
    Long id;

    @Column(name = "is_confirmed")
    Boolean isConfirmed;

    @Column(name = "email")
    String email;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    User user;

    public EmailConfirmation() {
    }

    public EmailConfirmation(User user, String email) {
        this.user = user;
        this.email = email;
        this.isConfirmed = false;
    }

    public Long getId() {
        return id;
    }

    public Boolean getIsConfirmed() {
        return isConfirmed;
    }

    public void setIsConfirmed(Boolean confirmed) {
        isConfirmed = confirmed;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
