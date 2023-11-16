package site.travellog.travellog.service;

import org.apache.catalina.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import site.travellog.travellog.domain.PlanDetail;
import site.travellog.travellog.domain.Users;
import site.travellog.travellog.dto.PlanDetailDto;
import site.travellog.travellog.dto.PlanDto;
import site.travellog.travellog.repository.PlanRepository;
import site.travellog.travellog.repository.UserRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest

class PlanServiceTest {

    @Autowired
    PlanService planService;

    @Autowired
    PlanRepository planRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @BeforeEach
    public void beforeEach() {
        planRepository.deleteAll();
    }

    @Test
    void 일정생성() {
        Users user = new Users();
        user.setName("shu914");
        user.setEmail("@fads");
        user.setPassword("1234");
        user.setBirthday(java.time.LocalDate.now());
        Long saveId = userService.join(user.getEmail(), user.getPassword(), user.getName(), user.getBirthday());

        PlanDetail planDetailDto1 = new PlanDetail();
        planDetailDto1.setName("제목1");
        planDetailDto1.setLocation("장소1");
        planDetailDto1.setLat(36.1234);
        planDetailDto1.setLng(127.1234);
        planDetailDto1.setImg("https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/08/urbanbrush-20200821001006257893.jpg");
        planDetailDto1.setDay(1);
        planDetailDto1.setSeq(1);

        PlanDetail planDetailDto2 = new PlanDetail();
        planDetailDto2.setName("제목1");
        planDetailDto2.setLocation("장소1");
        planDetailDto2.setLat(36.1234);
        planDetailDto2.setLng(127.1234);
        planDetailDto2.setImg("https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/08/urbanbrush-20200821001006257893.jpg");
        planDetailDto2.setDay(1);
        planDetailDto2.setSeq(1);


        PlanDto planDto = new PlanDto();
        planDto.setTitle("제목");
        planDto.setDescription("설명");
        planDto.setStartDate(java.time.LocalDate.now());
        planDto.setEndDate(java.time.LocalDate.now());
        planDto.setCreatedAt(java.time.LocalDate.now());
        planDto.setUserId(saveId);
        planDto.setPlanDetails(List.of(planDetailDto1, planDetailDto2));

        Long planServiceId = planService.addPlan(planDto);

        assertEquals(planDto.getTitle(), planRepository.findById(planServiceId).get().getTitle());

    }
}