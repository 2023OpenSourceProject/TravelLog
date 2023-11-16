package site.travellog.travellog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.travellog.travellog.domain.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
