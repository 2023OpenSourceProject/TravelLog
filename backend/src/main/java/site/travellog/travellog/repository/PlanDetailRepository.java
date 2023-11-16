package site.travellog.travellog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.travellog.travellog.domain.PlanDetail;

public interface PlanDetailRepository extends JpaRepository<PlanDetail, Long> {

}
