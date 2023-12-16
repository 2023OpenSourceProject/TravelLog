package site.travellog.travellog.dto;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class PlanDetailDto {
    private Long planDetailId;

    private String name;
    private String location;
    private double lat;
    private double lng;
    private String img;
    private int day;
    private int seq;
    private String category;

}
