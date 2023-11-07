package com.example.demo.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class Review {
    private String title;
    private String content;
    private String location;
    private String photo;
    private int status;
    private int plan_id;
    private int user_id;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    private int view;
}
