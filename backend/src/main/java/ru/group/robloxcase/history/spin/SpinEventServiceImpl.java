package ru.group.robloxcase.history.spin;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpinEventServiceImpl implements SpinEventService{

    private final SpinEventRepository spinEventRepository;

    public SpinEventServiceImpl(SpinEventRepository spinEventRepository) {
        this.spinEventRepository = spinEventRepository;
    }

    @Override
    public List<SpinEvent> findAllByUserId(Long userId) {
        Specification<SpinEvent> spec = (root, query, criteriaBuilder) -> {
            query.orderBy(criteriaBuilder.desc(root.get("id")));
            return criteriaBuilder.equal(root.get("inventory").get("user").get("id"), userId);
        };
        return spinEventRepository.findAll(spec);
    }
}
