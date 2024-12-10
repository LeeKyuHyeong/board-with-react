package kh.react.board.member.controller;

import kh.react.board.member.model.Member;
import kh.react.board.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MemberController {
    @Autowired
    private MemberService memberService;

    // 모든 사용자 조회
    @GetMapping
    public List<Member> getAllUsers() {
        return memberService.getAllUsers();
    }

    @PostMapping("/users/")
    public ResponseEntity<String> registerUser(@RequestBody Member member) {
        // 실제 회원가입 처리 로직
        System.out.println("registerUser start!");
        boolean isRegistered = memberService.registerUser(member);
        if (isRegistered) {
            return ResponseEntity.ok("Member registered successfully");
        } else {
            return ResponseEntity.status(400).body("Error during registration");
        }
    }
}
