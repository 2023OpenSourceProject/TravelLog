package site.travellog.travellog;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import site.travellog.travellog.global.util.SendingEmail;

@SpringBootTest
class TravellogApplicationTests {

    @Test
    void contextLoads() {
    }


    @Autowired
    SendingEmail findPassword;

    @Test
    void findPassword() {
        String email = "shu914@naver.com";
        String usernames = "shu914";

        String text = "비밀번호 찾기\n" +
                "아이디 : " + usernames + "\n" +
                "비밀번호 : " + "1234";

        findPassword.sendMail(email, text);
    }


}
