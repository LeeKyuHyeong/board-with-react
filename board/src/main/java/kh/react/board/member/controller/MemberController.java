package kh.react.board.member.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kh.react.board.member.model.Member;
import kh.react.board.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class MemberController {
    @Autowired
    private MemberService memberService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 모든 사용자 조회
    @GetMapping("/members")
    public Map<String, Object> getMembers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "email", required = false) String email) {

        // 페이징된 회원 목록을 가져옴
        Page<Member> pageMembers = memberService.getMembers(page, size, name, email);

        // 페이징된 데이터를 Map으로 반환
        return Map.of(
                "content", pageMembers.getContent(),  // 데이터 리스트
                "totalElements", pageMembers.getTotalElements(),  // 전체 데이터 수
                "totalPages", pageMembers.getTotalPages(),  // 전체 페이지 수
                "currentPage", pageMembers.getNumber(),  // 현재 페이지
                "size", size        //목록 수
        );
    }

    @PostMapping("/members/")
    public ResponseEntity<String> registerMember(@RequestBody Member member) {
        // 실제 회원가입 처리 로직
//        System.out.println("registerMember start!");

        try {
            memberService.registerMember(member);
            return ResponseEntity.ok("Member registered successfully");
        } catch(IllegalArgumentException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    // 특정 ID를 가진 회원을 조회
    @GetMapping("/members/{id}")
    public Member getMemberDetail(@PathVariable String id) {
        return memberService.getMemberById(id);
    }

    // 회원 삭제
    @DeleteMapping("/members/{id}")
    public String deleteMember(@PathVariable String id) {
        boolean isDeleted = memberService.deleteMember(id);
        if (isDeleted) {
            return "Member deleted successfully";
        } else {
            return "Member not found";
        }
    }

    // 회원 정보 수정
    @PutMapping("/members/{id}")
    public Member updateMember(@PathVariable String id, @RequestBody Member member) {
        return memberService.updateMember(id, member);
    }

//    @Autowired(required = false)
//    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/login/")
    public Map<String, Object> login(@RequestBody Member member, HttpServletRequest request, HttpServletResponse response) {

        String statCd;
        String statMsg;

        int timeout = 0;
        // 사용자 이름으로 사용자 찾기
        Member findMember = memberService.getMemberById(member.getId());

        if (findMember != null && passwordEncoder.matches(member.getPassword(), findMember.getPassword())) {
//        if (findMember != null && (member.getPassword().equals(findMember.getPassword()))) {
            // 로그인 성공, 세션에 사용자 정보 저장
            request.getSession().setAttribute("member", findMember);
            request.getSession().setAttribute("userId", findMember.getId());
            timeout = request.getSession().getMaxInactiveInterval(); // 세션 유지 시간 (초)

            statCd = "200";
            statMsg = "로그인 성공";
        } else {
            statCd = "100";
            statMsg = "로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다.";
        }

        return Map.of(
                "member", findMember, // 로그인 유저 정보
                "statCd", statCd,  // 로그인 상태 코드
                "statMsg", statMsg,  // 로그인 시도 메세지
                "timeout", timeout // 세션 유지 시간 (초)
        );
    }

    @GetMapping("/logout/")
    public String logout(HttpServletRequest request) {
        // 세션 무효화
        System.out.println("로그아웃 성공");

        request.getSession().invalidate();
        return "로그아웃 성공";
    }

    @GetMapping("/check-session/")
    public String checkSession(HttpServletRequest request) {
        // 세션에 저장된 사용자 정보 확인
        Member member = (Member) request.getSession().getAttribute("member");
        if (member != null) {
            return "로그인한 사용자: " + member.getId();
        } else {
            return "로그인되지 않았습니다.";
        }
    }

    // 비밀번호 초기화
    @PostMapping("/find/")
    public ResponseEntity<String> findMember(@RequestBody Member member) {
        try {
            memberService.resetPassword(member);
            return ResponseEntity.ok("Password Reset finished");
        } catch(IllegalArgumentException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
