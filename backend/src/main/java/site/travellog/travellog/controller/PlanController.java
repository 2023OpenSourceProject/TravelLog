package site.travellog.travellog.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import site.travellog.travellog.domain.Plan;
import site.travellog.travellog.dto.PlanDto;
import site.travellog.travellog.service.PlanService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PlanController {
    private final PlanService planService;

    @PostMapping("/plan")
    public String createPlan(@RequestBody PlanDto planDto) {
        planService.addPlan(planDto);
        return "일정 생성 성공";
    }

    @GetMapping ("/user/myplan")
    public List<PlanDto> getMyPlan() {
        List<PlanDto> planList = planService.getMyPlan();
        System.out.println(planList);
        return planList;
    }

    @GetMapping ("/plan/{planid}")
    public PlanDto getPlan(@PathVariable Long planid) {
        PlanDto plan = planService.getPlan(planid);
        return plan;
    }

}
