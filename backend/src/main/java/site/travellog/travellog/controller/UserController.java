package site.travellog.travellog.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.travellog.travellog.dto.UserDto;
import site.travellog.travellog.dto.sign_in.SignInRequest;
import site.travellog.travellog.service.UserService;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 회원가입
    @PostMapping("/user")
    public ResponseEntity<String> join(UserDto userDto) {
        Long userId = userService.join(userDto.getEmail(), userDto.getPassword(), userDto.getName(), userDto.getBirthday());
        HttpHeaders headers = new HttpHeaders();
        return ResponseEntity.ok().headers(headers).body("회원가입 성공\n"+ "회원아이디: " + userId);
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<String> login(SignInRequest signInRequest) {
        String jwt = userService.signIn(signInRequest);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", jwt);
        return ResponseEntity.ok().headers(headers).body(jwt);
    }

    // 회원정보 수정
    @PostMapping("/user/change")
    public ResponseEntity<String> update(UserDto userDto) {
        userService.update(userDto.getPassword(), userDto.getName(), userDto.getBirthday());
        HttpHeaders headers = new HttpHeaders();
        return ResponseEntity.ok().headers(headers).body("회원정보 수정 성공");
    }

    // 비밀번호 초기화
    @PostMapping("/user/reset")
    public String resetPassword(UserDto userDto) {
        userService.findPassword(userDto.getEmail(), userDto.getName(), userDto.getBirthday());
        return "비밀번호 초기화 성공";
    }




}
