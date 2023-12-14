package site.travellog.travellog.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import site.travellog.travellog.dto.ReviewDto;
import site.travellog.travellog.global.s3.S3Upload;
import site.travellog.travellog.service.ReviewService;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ReviewController {
    private final ReviewService reviewService;
    private final S3Upload s3Upload;

    @PostMapping("/review")
    public String uploadFile(@RequestParam("img") MultipartFile multipartFile,ReviewDto reviewDto) throws IOException {
        long fileSize = multipartFile.getSize();
        String url =s3Upload.upload(multipartFile.getInputStream(), multipartFile.getOriginalFilename(), fileSize);
        reviewService.createReview(url,reviewDto);
        return "리뷰 생성 성공";
    }


    // 리뷰 리스트 조회
    @GetMapping("/review")
    public List<ReviewDto> getReviewList() {
        List<ReviewDto> reviewDto =reviewService.getReviewList();
        return reviewDto;
    }
//
//
//    //내 리뷰 리스트 조회
    @GetMapping("/user/myreview")
    public List<ReviewDto> getMyReviewList() {
        List<ReviewDto> myReviewList = reviewService.getMyReviewList();
        return myReviewList;
    }
//
//    // 리뷰 1개 조회
    @GetMapping("/review/{reviewId}")
    public ReviewDto getReview(@PathVariable Long reviewId) {
        ReviewDto review = reviewService.getReview(reviewId);
        return review;
    }

    // 리뷰 삭제
    @PostMapping("/review/delete/{reviewId}")
    public String deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId);
        return "리뷰 삭제 성공";
    }



    // 리뷰 수정
    @PostMapping("/review/update/{reviewId}")
    public String updateReview(@PathVariable Long reviewId, @RequestBody ReviewDto reviewDto) {
        reviewService.updateReview(reviewId, reviewDto);
        return "리뷰 수정 성공";
    }

}

