package site.travellog.travellog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.travellog.travellog.domain.Plan;

import java.util.List;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    List<Plan> findByUserId(Long userId);
}
