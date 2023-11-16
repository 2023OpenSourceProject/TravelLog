package site.travellog.travellog.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter @Setter
public class Plan {
    @Id
    @GeneratedValue
    @Column(name = "plan_id")
    private Long id;

    private String title;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate createdAt;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id")
    private Users user;

    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL)
    private List<PlanDetail> planDetails;

    @OneToOne(mappedBy = "plan",fetch=FetchType.LAZY)
    private Review review;

    // 연관관계 메소드
    public void setUser(Users user) {
        this.user = user;
        user.getPlans().add(this);
    }

    public void addPlanDetail(PlanDetail planDetail) {
        planDetails.add(planDetail);
        planDetail.setPlan(this);
    }


}
