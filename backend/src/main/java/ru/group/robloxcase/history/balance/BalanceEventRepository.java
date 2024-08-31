package ru.group.robloxcase.history.balance;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface BalanceEventRepository extends JpaRepository<BalanceEvent, Long>, JpaSpecificationExecutor<BalanceEvent> {
}
