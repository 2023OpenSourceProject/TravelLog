package site.travellog.travellog.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter @Setter
public class Review {
    @Id
    @GeneratedValue
    @Column(name = "review_id")
    private Long id;

    private String title;
    @Column(columnDefinition = "TEXT")
    private String content;
    private String locate;
    private String img;
    private LocalDate createdAt;
    private Short isPublic;
    private Long view;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id")
    private Users user;

    @OneToMany(mappedBy = "review")
    private List<Comment> comments;

    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "plan_id")
    private Plan plan;

    // 연관관계 메소드
    public void setUser(Users user) {
        this.user = user;
        user.getReviews().add(this);
    }

    public void addComment(Comment comment) {
        comments.add(comment);
        comment.setReview(this);
    }

    public void setPlan(Plan plan) {
        this.plan = plan;
        plan.setReview(this);
    }
}
