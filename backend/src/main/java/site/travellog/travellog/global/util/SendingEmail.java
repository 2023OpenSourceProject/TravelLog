package site.travellog.travellog.global.util;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class SendingEmail {
    @Autowired
    private JavaMailSender mailSender;
    public void sendMail(String to, String text) {
        SimpleMailMessage massage = new SimpleMailMessage();
        massage.setTo(to);
        massage.setSubject("[TravelLog] 초기화된 비밀번호 입니다.");
        massage.setText(text);

        mailSender.send(massage);
    }
}