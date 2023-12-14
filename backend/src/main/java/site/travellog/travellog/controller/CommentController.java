package site.travellog.travellog.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import site.travellog.travellog.dto.CommentDto;
import site.travellog.travellog.service.CommentService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    //댓글 추가
    @PostMapping("/comment/{reviewId}")
    public String createComment(@PathVariable Long reviewId, CommentDto commentDto) {
        commentService.createComment(reviewId, commentDto);
        return "댓글 추가 성공";
    }

    // 댓글 조회
    @GetMapping("/comment/{reviewId}")
    public List<CommentDto> getCommentList(@PathVariable Long reviewId) {
        List<CommentDto> commentDtoList = commentService.getCommentList(reviewId);
        return commentDtoList;
    }

    // 댓글 삭제
    @PostMapping("/comment/delete/{commentId}")
    public String deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return "댓글 삭제 성공";
    }
}
