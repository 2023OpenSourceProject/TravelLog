package site.travellog.travellog.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.travellog.travellog.domain.Plan;
import site.travellog.travellog.domain.PlanDetail;
import site.travellog.travellog.dto.PlanDetailDto;
import site.travellog.travellog.dto.PlanDto;
import site.travellog.travellog.repository.PlanRepository;
import site.travellog.travellog.repository.UserRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PlanService {
    private final PlanRepository planRepository;
    private final UserRepository userRepository;

    // 여행 계획 추가
    public Long addPlan(PlanDto planDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Long id = Long.parseLong(username);

        Plan plan = new Plan();
        plan.setTitle(planDto.getTitle());
        plan.setStartDate(planDto.getStart_date());
        plan.setEndDate(planDto.getEnd_date());
        plan.setCreatedAt(LocalDate.now());
        plan.setUser(userRepository.findById(id).get());
        plan.setPlanDetails(new ArrayList<>());


        List<PlanDetailDto> planDetails = planDto.getPlan_details();
        if (planDetails == null) {
            throw new IllegalArgumentException("Plan details cannot be null");
        }

        for (PlanDetailDto planDetailDto : planDetails) {
            PlanDetail planDetail = new PlanDetail();
            planDetail.setName(planDetailDto.getName());
            planDetail.setLocation(planDetailDto.getLocation());
            planDetail.setLat(planDetailDto.getLat());
            planDetail.setLng(planDetailDto.getLng());
            planDetail.setImg(planDetailDto.getImg());
            planDetail.setDay(planDetailDto.getDay());
            planDetail.setSeq(planDetailDto.getSeq());
            planDetail.setCategory(planDetailDto.getCategory());
            plan.addPlanDetail(planDetail);
        }

        return planRepository.save(plan).getId();
    }

    // 내 여행 계획 리스트 조회
    public List<PlanDto> getMyPlan() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Long userId = Long.parseLong(username);

        List<Plan> plans = planRepository.findByUserId(userId);
        List<PlanDto> planDtos = new ArrayList<>();

        for(Plan plan : plans) {
            PlanDto planDto = new PlanDto();
            planDto.setPlan_id(plan.getId());
            planDto.setTitle(plan.getTitle());
            planDto.setStart_date(plan.getStartDate());
            planDto.setEnd_date(plan.getEndDate());
            planDto.setCreated_at(plan.getCreatedAt());
            planDto.setUserId(plan.getUser().getId());

            List<PlanDetailDto> planDetailDtos = new ArrayList<>();
            for (PlanDetail planDetail : plan.getPlanDetails()) {
                PlanDetailDto planDetailDto = new PlanDetailDto();
                planDetailDto.setPlanDetailId(planDetail.getId());
                planDetailDto.setName(planDetail.getName());
                planDetailDto.setLocation(planDetail.getLocation());
                planDetailDto.setLat(planDetail.getLat());
                planDetailDto.setLng(planDetail.getLng());
                planDetailDto.setImg(planDetail.getImg());
                planDetailDto.setDay(planDetail.getDay());
                planDetailDto.setSeq(planDetail.getSeq());
                planDetailDto.setCategory(planDetail.getCategory());

                planDetailDtos.add(planDetailDto);
            }

            planDto.setPlan_details(planDetailDtos);


            planDtos.add(planDto);
        }

        return planDtos;
    }

    // 여행 계획 조회(1개)
    public PlanDto getPlan(Long planId){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Long userId = Long.parseLong(username);

        Plan plan = planRepository.findById(planId).get();

        //만약 유저 본인이 아니면 예외를 처리한다.
        if(plan.getUser().getId() != userId){
            throw new IllegalArgumentException("You are not the owner of this plan");
        }

        PlanDto planDto = new PlanDto();

        planDto.setPlan_id(plan.getId());
        planDto.setTitle(plan.getTitle());
        planDto.setStart_date(plan.getStartDate());
        planDto.setEnd_date(plan.getEndDate());
        planDto.setCreated_at(plan.getCreatedAt());
        planDto.setUserId(plan.getUser().getId());
        List<PlanDetailDto> planDetailDtos = new ArrayList<>();
        for (PlanDetail planDetail : plan.getPlanDetails()) {
            PlanDetailDto planDetailDto = new PlanDetailDto();
            planDetailDto.setPlanDetailId(planDetail.getId());
            planDetailDto.setName(planDetail.getName());
            planDetailDto.setLocation(planDetail.getLocation());
            planDetailDto.setLat(planDetail.getLat());
            planDetailDto.setLng(planDetail.getLng());
            planDetailDto.setImg(planDetail.getImg());
            planDetailDto.setDay(planDetail.getDay());
            planDetailDto.setSeq(planDetail.getSeq());
            planDetailDto.setCategory(planDetail.getCategory());

            planDetailDtos.add(planDetailDto);
        }
        planDto.setPlan_details(planDetailDtos);

        return planDto;
    }


}
