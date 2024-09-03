package ru.group.robloxcase.balance_event;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BalanceEventServiceImpl implements BalanceEventService{

    private final BalanceEventRepository balanceEventRepository;

    public BalanceEventServiceImpl(BalanceEventRepository balanceEventRepository) {
        this.balanceEventRepository = balanceEventRepository;
    }

    @Override
    public List<BalanceEvent> findAllByUserId(Long userId) {
        Specification<BalanceEvent> spec = (root, query, criteriaBuilder) -> {
            query.orderBy(criteriaBuilder.desc(root.get("id")));
            return criteriaBuilder.equal(root.get("balance").get("user").get("id"), userId);
        };
        return balanceEventRepository.findAll(spec);
    }
}
