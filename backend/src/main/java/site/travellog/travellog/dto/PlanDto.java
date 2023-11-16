package site.travellog.travellog.dto;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import site.travellog.travellog.domain.PlanDetail;
import site.travellog.travellog.domain.Users;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class PlanDto {
    private Long plan_id;
    private String title;
    private LocalDate start_date;
    private LocalDate end_date;
    private LocalDate created_at;
    private Long userId;
    private List<PlanDetailDto> plan_details= new ArrayList<>();;
}