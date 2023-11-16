package site.travellog.travellog.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import site.travellog.travellog.domain.Users;
import site.travellog.travellog.global.jwt.JwtService;
import site.travellog.travellog.repository.UserRepository;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
//@Transactional
class UserServiceTest {

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtService jwtService;


    @BeforeEach
    public void beforeEach() {
        userRepository.deleteAll();
    }


    @Test
    void 회원가입() {
        Users user = new Users();
        user.setName("shu914");
        user.setEmail("shu914@naver.com");
        user.setPassword("1234");
        user.setBirthday(java.time.LocalDate.now());
        Long saveId = userService.join(user.getEmail(), user.getPassword(), user.getName(), user.getBirthday());
        String jwt = jwtService.createJwt(saveId);
        System.out.println("JWT : " + jwt);
        assertEquals(user.getName(), userRepository.findById(saveId).get().getName());
    }

    @Test
    void 중복이름검사() {
        Users user1 = new Users();
        user1.setName("shu914");
        Users user2 = new Users();
        user2.setName("shu914");
        userService.join(user1.getEmail(), user1.getPassword(), user1.getName(), user1.getBirthday());
        assertThrows(IllegalStateException.class, () -> {
            userService.join(user2.getEmail(), user2.getPassword(), user2.getName(), user2.getBirthday());
        });
    }

    @Test
    void 비밀번호찾기() {
        Users user = new Users();
        user.setName("shu914");
        user.setEmail("shu914@naver.com");
        user.setPassword("1234");
        user.setBirthday(java.time.LocalDate.now());
        userService.join(user.getEmail(), user.getPassword(), user.getName(), user.getBirthday());

        userService.findPassword(user.getEmail(), user.getName(), user.getBirthday());

    }

    @Test
    void 회원정보수정() {
        Users user = new Users();
        user.setName("shu914");
        user.setEmail("shu914@naver.com");
        user.setPassword("1234");
        user.setBirthday(java.time.LocalDate.now());
        Long saveId = userService.join(user.getEmail(), user.getPassword(), user.getName(), user.getBirthday());

        // 수정할 정보 설정
        String updatedPassword = "1111";
        String updatedName = "hahaha";
        LocalDate updatedBirthday = null;

        // 회원 정보 수정
        userService.update(updatedPassword, updatedName, updatedBirthday);

        // 수정된 사용자 정보를 가져옴
        Users updatedUser = userRepository.findById(saveId).get();

        // 수정된 정보가 기대한 대로 변경되었는지 확인
        assertEquals(updatedPassword, updatedUser.getPassword());
        assertEquals(updatedName, updatedUser.getName());

        // 생일은 null로 설정했으므로, 원래 생일과 동일해야 함
        assertEquals(user.getBirthday(), updatedUser.getBirthday());

    }
}