package site.travellog.travellog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.travellog.travellog.domain.Comment;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByReviewId(Long reviewId);
    void deleteByReviewId(Long reviewId);
}
