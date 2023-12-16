package site.travellog.travellog.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class PlanDetail {

    @Id
    @GeneratedValue
    @Column(name = "plan_detail_id")
    private Long id;

    private String name;
    private String location;
    private double lat;
    private double lng;
    private String img;
    private int day;
    private int seq;
    private String category;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="plan_id")
    private Plan plan;



}
