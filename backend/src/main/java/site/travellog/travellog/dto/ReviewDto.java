package site.travellog.travellog.dto;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class ReviewDto {
    private Long reviewId;

    private String title;
    private String content;
    private String locate;
    private String imgUrl;
    private LocalDateTime createdAt;
    private Short isPublic;
    private Long view;
    private Long userId;
    private Long planId;
    private String userName;



}
