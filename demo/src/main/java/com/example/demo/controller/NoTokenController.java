package com.example.demo.controller;

import com.example.demo.dto.Comment;
import com.example.demo.dto.Review;
import com.example.demo.dto.request.JoinForm;
import com.example.demo.dto.request.LoginForm;
import com.example.demo.dto.response.Token;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@Slf4j
public class NoTokenController {
    @PostMapping("/login")
    public Token login(LoginForm loginForm) {
        log.info("email = {}", loginForm.getEmail());
        log.info("password = {}", loginForm.getPassword());
        Token token = new Token();
        token.setToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2ZWxvcGVydC5jb20iLCJleHAiOiIxNDg1MjcwMDAwMDAwIiwiaHR0cHM6Ly92ZWxvcGVydC5jb20vand0X2NsYWltcy9pc19hZG1pbiI6dHJ1ZSwidXNlcklkIjoiMTEwMjgzNzM3MjcxMDIiLCJ1c2VybmFtZSI6InZlbG9wZXJ0In0.WE5fMufM0NDSVGJ8cAolXGkyB5RmYwCto1pQwDIqo2w");
        return token;
    }

    @PostMapping("/user")
    public String join(JoinForm joinForm) {
        log.info("name = {}", joinForm.getName());
        log.info("email = {}", joinForm.getEmail());
        log.info("password = {}", joinForm.getPassword());
        log.info("birth = {}", joinForm.getBirthday());
        return "ok";
    }

    @PostMapping("/user/reset")
    public String resetPassword(JoinForm joinForm) {
        log.info("email = {}", joinForm.getEmail());
        log.info("birth = {}", joinForm.getBirthday());
        log.info("name = {}", joinForm.getName());
        return "ok";
    }

    @GetMapping("/review/{reviewid}")
    public Review getReview(@PathVariable int reviewid) {
        log.info("reviewid = {}", reviewid);
        Review review = new Review();
        review.setTitle("제목");
        review.setContent("내용");
        review.setLocation("장소");
        review.setPhoto("https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/08/urbanbrush-20200821001006257893.jpg");
        review.setStatus(1);
        review.setPlan_id(12);
        review.setUser_id(133);
        review.setView(10000);
        LocalDateTime now = LocalDateTime.now();
        review.setCreated_at(now);
        return review;
    }

    @GetMapping("/review")
    public List<Review> getReviewList() {
        Review review1 = new Review();
        review1.setTitle("제목");
        review1.setContent("내용");
        review1.setLocation("장소");
        review1.setPhoto("https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/08/urbanbrush-20200821001006257893.jpg");
        review1.setStatus(1);
        review1.setPlan_id(12);
        review1.setUser_id(133);
        review1.setView(10000);
        LocalDateTime now = LocalDateTime.now();
        review1.setCreated_at(now);

        Review review2 = new Review();
        review2.setTitle("제목");
        review2.setContent("내용");
        review2.setLocation("장소");
        review2.setPhoto("https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/08/urbanbrush-20200821001006257893.jpg");
        review2.setStatus(1);
        review2.setPlan_id(12);
        review2.setUser_id(133);
        review2.setView(10000);
        review2.setCreated_at(now);

        List<Review> reviews = List.of(review1, review2);
        log.info("reviews = {}", reviews);
        return reviews;
    }

    @GetMapping("/comment/{reviewid}")
    public List<Comment> getComment(@PathVariable int reviewid) {
        log.info("reviewid = {}", reviewid);
        Comment comment1 = new Comment();
        Comment comment2 = new Comment();
        Comment comment3 = new Comment();
        comment1.setUser_id(1);
        comment1.setContent("댓글1");
        comment1.setCreated_at(LocalDateTime.now());
        comment2.setUser_id(2);
        comment2.setContent("댓글2");
        comment2.setCreated_at(LocalDateTime.now());
        comment3.setUser_id(3);
        comment3.setContent("댓글3");
        comment3.setCreated_at(LocalDateTime.now());

        List<Comment> comments = List.of(comment1, comment2, comment3);


        return comments;
    }
}
