package com.example.demo.controller;

import com.example.demo.dto.Comment;
import com.example.demo.dto.Plan;
import com.example.demo.dto.PlanDetail;
import com.example.demo.dto.Review;
import com.example.demo.dto.request.JoinForm;
import com.example.demo.dto.response.PlanList;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@Slf4j
public class NeedTokenController {
    @PatchMapping("/user")
    public String updateUser(@RequestHeader("Authorization") String token, JoinForm joinForm) {
        log.info("token = {}", token);
        log.info("name = {}", joinForm.getName());
        log.info("password = {}", joinForm.getPassword());
        return "ok";
    }

    @PostMapping("/plan")
    public String createPlan(@RequestHeader("Authorization") String token,@RequestBody Plan plan) {
        log.info("token = {}", token);
        log.info("title = {}", plan.getTitle());
        log.info("start_date = {}", plan.getStart_date());
        log.info("end_date = {}", plan.getEnd_date());
        log.info("plan_detail = {}", plan.getPlan_detail());

        return "ok";
    }

    @GetMapping("/plan/{planid}")
    public Plan getPlan(@RequestHeader("Authorization") String token) {
        log.info("token = {}", token);
        PlanDetail planDetail1 = new PlanDetail();
        PlanDetail planDetail2 = new PlanDetail();
        planDetail1.setName("제목1");
        planDetail1.setLocation("장소1");
        planDetail1.setLat("36.1234");
        planDetail1.setLon("127.1234");
        planDetail1.setImg("https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/08/urbanbrush-20200821001006257893.jpg");
        planDetail1.setDay(1);
        planDetail1.setSeq(1);
        planDetail2.setName("제목2");
        planDetail2.setLocation("장소2");
        planDetail2.setLat("36.1234");
        planDetail2.setLon("127.1234");
        planDetail2.setImg("https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/08/urbanbrush-20200821001006257893.jpg");
        planDetail2.setDay(2);
        planDetail2.setSeq(2);
        Plan plan = new Plan();
        plan.setTitle("제목");
        plan.setStart_date("2021-01-01");
        plan.setEnd_date("2021-01-02");
        plan.setId(4);
        plan.setCreated_at(LocalDateTime.now());
        plan.setModified_at(LocalDateTime.now());
        plan.setPlan_detail(List.of(planDetail1, planDetail2));
        return plan;
    }

    @GetMapping("/user/myplan")
    public List<PlanList> getMyPlan(@RequestHeader("Authorization") String token) {
        log.info("token = {}", token);
        PlanList planList1 = new PlanList();
        PlanList planList2 = new PlanList();
        PlanList planList3 = new PlanList();
        planList1.setId(1L);
        planList1.setTitle("제목1");
        planList1.setStart_date("2021-01-01");
        planList1.setEnd_date("2021-01-02");
        planList1.setCreated_at(LocalDateTime.now());
        planList1.setModified_at(LocalDateTime.now());
        planList1.setImg("https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/08/urbanbrush-20200821001006257893.jpg");

        planList2.setId(2L);
        planList2.setTitle("제목2");
        planList2.setStart_date("2021-01-01");
        planList2.setEnd_date("2021-01-02");
        planList2.setCreated_at(LocalDateTime.now());
        planList2.setModified_at(LocalDateTime.now());
        planList2.setImg("https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/08/urbanbrush-20200821001006257893.jpg");

        planList3.setId(3L);
        planList3.setTitle("제목3");
        planList3.setStart_date("2021-01-01");
        planList3.setEnd_date("2021-01-02");
        planList3.setCreated_at(LocalDateTime.now());
        planList3.setModified_at(LocalDateTime.now());
        planList3.setImg("https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/08/urbanbrush-20200821001006257893.jpg");

        return List.of(planList1, planList2, planList3);
    }

    @PostMapping("/review")
    public String createReview(@RequestHeader("Authorization") String token,@RequestBody Review review) {
        log.info("token = {}", token);
        log.info("title = {}", review.getTitle());
        log.info("content = {}", review.getContent());
        log.info("location = {}", review.getLocation());
        log.info("photo = {}", review.getPhoto());
        log.info("status = {}", review.getStatus());
        log.info("plan_id = {}", review.getPlan_id());
        return "ok";
    }

    @GetMapping("/review/myreview")
    public List<Review> getMyReview(@RequestHeader("Authorization") String token) {
        log.info("token = {}", token);
        Review review1 = new Review();
        Review review2 = new Review();
        Review review3 = new Review();

        review1.setTitle("제목1");
        review2.setTitle("제목2");
        review3.setTitle("제목3");

        review1.setLocation("장소1");
        review2.setLocation("장소2");
        review3.setLocation("장소3");

        review1.setPhoto("https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/08/urbanbrush-20200821001006257893.jpg");
        review2.setPhoto("https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/08/urbanbrush-20200821001006257893.jpg");
        review3.setPhoto("https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/08/urbanbrush-20200821001006257893.jpg");

        review1.setStatus(1);
        review2.setStatus(1);
        review3.setStatus(1);

        review1.setCreated_at(LocalDateTime.now());
        review2.setCreated_at(LocalDateTime.now());
        review3.setCreated_at(LocalDateTime.now());

        review1.setUpdated_at(LocalDateTime.now());
        review2.setUpdated_at(LocalDateTime.now());
        review3.setUpdated_at(LocalDateTime.now());

        review1.setView(10000);
        review2.setView(10000);
        review3.setView(10000);



        return List.of(review1, review2, review3);
    }

    @PostMapping("/comment/{reviewid}")
    public String createComment(@PathVariable int reviewid, @RequestHeader("Authorization") String token, @RequestBody Comment comment) {
        log.info("token = {}", token);
        comment.setReview_id(reviewid);
        log.info("reviewid = {}", comment.getReview_id());
        log.info("content = {}", comment.getContent());

        return "ok";
    }


}
