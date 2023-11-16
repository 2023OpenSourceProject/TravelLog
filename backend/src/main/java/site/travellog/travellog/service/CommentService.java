package site.travellog.travellog.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import site.travellog.travellog.domain.Comment;
import site.travellog.travellog.domain.Review;
import site.travellog.travellog.dto.CommentDto;
import site.travellog.travellog.dto.ReviewDto;
import site.travellog.travellog.dto.UserDto;
import site.travellog.travellog.repository.CommentRepository;
import site.travellog.travellog.repository.ReviewRepository;
import site.travellog.travellog.repository.UserRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    //댓글 추가
    public void createComment(Long reviewId, CommentDto commentDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Long userId = Long.parseLong(username);
        Comment comment = new Comment();
        comment.setContent(commentDto.getContent());
        comment.setCreatedAt(LocalDate.now());
        Review review = reviewRepository.findById(reviewId).get();
        comment.setReview(review);
        comment.setUser(userRepository.findById(userId).get());
        commentRepository.save(comment);

    }

    // 댓글 조회
    public List<CommentDto> getCommentList(Long reviewId) {
        List<Comment> comments = commentRepository.findByReviewId(reviewId);
        List<CommentDto> commentDtoList = new ArrayList<>();


        for (Comment comment : comments) {
            CommentDto commentDto = new CommentDto();
            commentDto.setContent(comment.getContent());
            commentDto.setCommentId(comment.getId());
            commentDto.setCreatedAt(comment.getCreatedAt());
            commentDto.setUserId(comment.getUser().getId());
            commentDto.setReviewId(comment.getReview().getId());
            commentDtoList.add(commentDto);
        }

        return commentDtoList;
    }
}
