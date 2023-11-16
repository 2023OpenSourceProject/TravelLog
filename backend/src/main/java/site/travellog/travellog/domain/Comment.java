package site.travellog.travellog.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Comment {
    @Id
    @GeneratedValue
    @Column(name = "comment_id")
    private Long id;

    private String content;
    private LocalDate createdAt;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id")
    private Users user;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="review_id")
    private Review review;

    // 연관관계 메소드
    public void setUser(Users user) {
        this.user = user;
        user.getComments().add(this);
    }
}
