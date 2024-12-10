package kh.react.board.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 모든 API 경로에 대해 CORS를 허용합니다.
        registry.addMapping("/api/**")  // "/api/**" 경로에 CORS 적용
                .allowedOrigins("http://localhost:3000")  // React 앱이 실행되는 주소
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // 허용할 HTTP 메소드
                .allowedHeaders("*")  // 모든 헤더 허용
                .allowCredentials(true);  // 쿠키와 자격 증명 정보를 포함한 요청 허용
    }
}
