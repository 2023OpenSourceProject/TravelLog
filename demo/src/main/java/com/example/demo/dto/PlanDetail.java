package com.example.demo.dto;

import lombok.Data;

@Data
public class PlanDetail {

    private String name;
    private String location;
    private String lat;
    private String lon;
    private String img;
    private int day;
    private int seq;
}
