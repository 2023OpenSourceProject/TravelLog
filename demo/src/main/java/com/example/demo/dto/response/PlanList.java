package com.example.demo.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PlanList {
    private Long id;
    private String title;
    private String start_date;
    private String end_date;
    private LocalDateTime created_at;
    private LocalDateTime modified_at;
    private String img;
    private Long view;
}
