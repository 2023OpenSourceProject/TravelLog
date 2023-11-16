package site.travellog.travellog.dto;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class CommentDto {
    private Long commentId;
    private String content;
    private LocalDate createdAt;
    private Long userId;
    private Long reviewId;
}
