package com.example.demo.dto.request;

import lombok.Data;

@Data
public class JoinForm {
    private String name;
    private String email;
    private String password;
    //생일
    private String birthday;
}
