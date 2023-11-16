package site.travellog.travellog.global.jwt;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import site.travellog.travellog.domain.Users;
import site.travellog.travellog.service.UserService;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class JwtServiceTest {

    @Autowired
    UserService userService;

    @Autowired
    JwtService jwtService;

    @Test
    void createJwt() {
        Users user = new Users();
        user.setName("shu914");
        user.setEmail("shu914@naver.com");
        user.setPassword("1234");
        user.setBirthday(java.time.LocalDate.now());
        Long saveId = userService.join(user.getEmail(), user.getPassword(), user.getName(), user.getBirthday());
        String jwt = jwtService.createJwt(saveId);
        System.out.println("JWT : " + jwt);

        try {
            //jwt에서 id 추출.
            Long userIdByJwt = jwtService.getUserId(jwt);
            //추출한 ID와 접근한 유저의 ID가 같은지 확인
            if(saveId != userIdByJwt){
                System.out.println("접근 권한이 없습니다.");
            }
            System.out.println(userIdByJwt);
            System.out.println("접근 권한이 있습니다.");
        } catch (Exception exception) {
            System.out.println("오류발생.");
        }

    }

    @Test
    void getJwt() {
    }
}