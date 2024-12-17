package kh.react.board.util;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/session")
public class SessionController {
    @GetMapping("/user/")
    public ResponseEntity<?> getSessionUser(HttpSession session) {
        String userId = (String) session.getAttribute("userId");
        if (userId != null) {
            return ResponseEntity.ok().body(new UserResponse(userId));
        } else {
            return ResponseEntity.status(401).body("User not logged in");
        }
    }

    static class UserResponse {
        private String userId;

        public UserResponse(String userId) {
            this.userId = userId;
        }

        public String getUserId() {
            return userId;
        }
    }
}
