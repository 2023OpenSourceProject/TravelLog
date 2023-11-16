package site.travellog.travellog.dto.sign_in;

import lombok.Data;

@Data
public class SignInRequest {
    String email;
    String password;
}
