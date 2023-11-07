package com.example.demo.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class Plan {
    private int id;
    private LocalDateTime created_at;
    private LocalDateTime modified_at;


    private String title;
    private String start_date;
    private String end_date;
    private List<PlanDetail> plan_detail;

}
