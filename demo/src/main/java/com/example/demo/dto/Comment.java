package com.example.demo.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Comment {
    private int review_id;
    private int user_id;
    private String content;
    private LocalDateTime created_at;
}
