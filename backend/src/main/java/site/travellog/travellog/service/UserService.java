package site.travellog.travellog.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.travellog.travellog.domain.Users;
import site.travellog.travellog.dto.sign_in.SignInRequest;
import site.travellog.travellog.global.jwt.JwtService;
import site.travellog.travellog.global.util.SendingEmail;
import site.travellog.travellog.repository.UserRepository;

import java.time.LocalDate;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final SendingEmail sendingEmail;
    private final JwtService jwtService;

    //회원가입
    public Long join(String email, String password, String name, LocalDate birthday) {
        validateDuplicateMember(email); // 중복 회원 검증
        Users user = new Users();
        user.setEmail(email);
        user.setPassword(password);
        user.setName(name);
        user.setBirthday(birthday);
        userRepository.save(user);
        Long userId = userRepository.findByEmail(email).getId();

        //토큰 생성
        return userId;
    }

    // 비밀번호 찾기
    public void findPassword(String email, String name, LocalDate birthday) {
        Users user = userRepository.findByEmail(email);
        if(user == null) {
            throw new IllegalArgumentException("해당 이메일의 사용자를 찾을 수 없습니다.");
        }
        if(user.getName().equals(name) && user.getBirthday().equals(birthday)) {
            // 비밀번호 변경
            String newPassword = getTempPassword();
            user.setPassword(newPassword);
            sendingEmail.sendMail(email, "변경된 비밀번호를 안내해드립니다.\n"+
                    "비밀번호 : " + newPassword
                + "\n로그인 후 비밀번호를 변경해주세요.");
        } else {
            throw new IllegalStateException("이름 또는 생년월일이 일치하지 않습니다.");
        }

    }

    // 회원 정보 수정
    public void update( String password, String name, LocalDate birthday) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Long id = Long.parseLong(username);
        Users user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 사용자를 찾을 수 없습니다."));
        if (password != null) {
            user.setPassword(password);
        }
        if (name != null) {
            user.setName(name);
        }
        if (birthday != null) {
            user.setBirthday(birthday);
        }
    }

    // 로그인
    public String signIn(SignInRequest request) {
        Users user = userRepository.findByEmail(request.getEmail());
        String token;
        if(user == null) {
            throw new IllegalArgumentException("해당 이메일의 사용자를 찾을 수 없습니다.");
        }

        if(user.getPassword().equals(request.getPassword())) {
            //토큰 생성
            token = jwtService.createToken(user.getId());	// 토큰 생성
        } else {
            throw new IllegalStateException("비밀번호가 일치하지 않습니다.");
        }

        return token;	// 생성자에 토큰 추가
    }


    void validateDuplicateMember(String email) {
        Users findUsers = userRepository.findByEmail(email);
        if(findUsers != null) { // 이미 존재하는 회원
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }

    public String getTempPassword(){
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        String str = "";

        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        return str;
    }

    @Transactional(readOnly = true)
    public Users findById(final Long memberId) {
        return userRepository.findById(memberId).get();

    }
}
