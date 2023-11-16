package site.travellog.travellog.dto;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class UserDto {
    private Long userId;

    private String email;
    private String password;
    private String name;
    private LocalDate birthday;

}
