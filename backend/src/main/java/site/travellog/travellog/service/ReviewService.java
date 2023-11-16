package site.travellog.travellog.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.travellog.travellog.domain.Plan;
import site.travellog.travellog.domain.Review;
import site.travellog.travellog.dto.ReviewDto;
import site.travellog.travellog.repository.PlanRepository;
import site.travellog.travellog.repository.ReviewRepository;
import site.travellog.travellog.repository.UserRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewService {

        private final ReviewRepository reviewRepository;
        private final UserRepository userRepository;
        private final PlanRepository planRepository;

        // 리뷰 생성
        public void createReview(String url, ReviewDto reviewDto) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            Long userId = Long.parseLong(username);

            Review review = new Review();
            review.setImg(url);
            review.setTitle(reviewDto.getTitle());
            review.setContent(reviewDto.getContent());
            review.setLocate(reviewDto.getLocate());
            review.setIsPublic(reviewDto.getIsPublic());
            review.setView(0L);
            review.setUser(userRepository.findById(userId).get());
            //현재시간을 등록
            review.setCreatedAt(LocalDate.now());
            // 이후에 Plan 엔티티에 Review 엔티티를 설정하고 저장
            Plan plan = planRepository.findById(reviewDto.getPlanId()).get();
            review.setPlan(plan);

            // 먼저 Review 엔티티를 저장
            Review savedReview = reviewRepository.save(review);


            plan.setReview(savedReview);
            planRepository.save(plan);
        }

        // 리뷰 리스트 조회
        public List<ReviewDto> getReviewList() {
            List<Review> reviews = reviewRepository.findAll();
            List<ReviewDto> reviewDtoList = new ArrayList<>();

            // reviews에서 reviewDtoList로 데이터 옮기기
            for (Review review : reviews) {
                if (review.getIsPublic() == 1) {
                    ReviewDto reviewDto = new ReviewDto();

                    reviewDto.setReviewId(review.getId());
                    reviewDto.setTitle(review.getTitle());
                    reviewDto.setContent(review.getContent());
                    reviewDto.setLocate(review.getLocate());
                    reviewDto.setImgUrl(review.getImg());
                    reviewDto.setCreatedAt(review.getCreatedAt().atStartOfDay());
                    reviewDto.setIsPublic(review.getIsPublic());
                    reviewDto.setView(review.getView());
                    reviewDto.setUserId(review.getUser().getId());
                    reviewDto.setPlanId(review.getPlan().getId());

                    reviewDtoList.add(reviewDto);
                }
            }

            return reviewDtoList;
        }

//        내 리뷰 리스트 조회
        public List<ReviewDto> getMyReviewList() {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            Long userId = Long.parseLong(username);

            List<Review> reviews = reviewRepository.findAll();
            List<ReviewDto> reviewDtoList = new ArrayList<>();

            // reviews에서 reviewDtoList로 데이터 옮기기
            for (Review review : reviews) {
                if (review.getUser().getId() == userId) {
                    ReviewDto reviewDto = new ReviewDto();

                    reviewDto.setReviewId(review.getId());
                    reviewDto.setTitle(review.getTitle());
                    reviewDto.setContent(review.getContent());
                    reviewDto.setLocate(review.getLocate());
                    reviewDto.setImgUrl(review.getImg());
                    reviewDto.setCreatedAt(review.getCreatedAt().atStartOfDay());
                    reviewDto.setIsPublic(review.getIsPublic());
                    reviewDto.setView(review.getView());
                    reviewDto.setUserId(review.getUser().getId());
                    reviewDto.setPlanId(review.getPlan().getId());

                    reviewDtoList.add(reviewDto);
                }
            }
            return reviewDtoList;
        }

        // 리뷰 1개 조회
        public ReviewDto getReview(Long reviewId) {
            Review review = reviewRepository.findById(reviewId).get();
            ReviewDto reviewDto = new ReviewDto();
            reviewDto.setReviewId(review.getId());
            reviewDto.setTitle(review.getTitle());
            reviewDto.setContent(review.getContent());
            reviewDto.setLocate(review.getLocate());
            reviewDto.setImgUrl(review.getImg());
            reviewDto.setCreatedAt(review.getCreatedAt().atStartOfDay());
            reviewDto.setIsPublic(review.getIsPublic());
            reviewDto.setView(review.getView());
            reviewDto.setUserId(review.getUser().getId());
            reviewDto.setPlanId(review.getPlan().getId());
            return reviewDto;
        }
}
