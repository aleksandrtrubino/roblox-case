package ru.group.robloxcase.spin_event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface SpinEventRepository extends JpaRepository<SpinEvent, Long>, JpaSpecificationExecutor<SpinEvent> {
}
