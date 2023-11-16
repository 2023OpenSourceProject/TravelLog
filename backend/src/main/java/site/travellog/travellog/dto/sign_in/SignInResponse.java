package site.travellog.travellog.dto.sign_in;

public record SignInResponse(
        String email,
        String token	// 추가
) {
}