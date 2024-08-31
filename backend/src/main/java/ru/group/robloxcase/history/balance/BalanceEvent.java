package ru.group.robloxcase.history.balance;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import ru.group.robloxcase.balance.Balance;

import java.time.LocalDateTime;

@Entity
@Table(name = "balance_events")
public class BalanceEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "balance_events_seq")
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "balance_id", referencedColumnName = "id")
    private Balance balance;

    @Column(name = "sum")
    private Integer sum;

    @CreationTimestamp
    @Column(name = "created_at",columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt;

    public BalanceEvent() {}

    public BalanceEvent(Balance balance, Integer sum) {
        this.balance = balance;
        this.sum = sum;
    }

    public Long getId() {
        return id;
    }

    public Balance getBalance() {
        return balance;
    }

    public void setBalance(Balance balance) {
        this.balance = balance;
    }

    public Integer getSum() {
        return sum;
    }

    public void setSum(Integer sum) {
        this.sum = sum;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

}
