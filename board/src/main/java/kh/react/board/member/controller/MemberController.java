package kh.react.board.member.controller;

import kh.react.board.member.model.Member;
import kh.react.board.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.PagedModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class MemberController {
    @Autowired
    private MemberService memberService;

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
                "currentPage", pageMembers.getNumber()  // 현재 페이지
        );
    }

    @PostMapping("/members/")
    public ResponseEntity<String> registerMember(@RequestBody Member member) {
        // 실제 회원가입 처리 로직
        System.out.println("registerMember start!");
        boolean isRegistered = memberService.registerMember(member);
        if (isRegistered) {
            return ResponseEntity.ok("Member registered successfully");
        } else {
            return ResponseEntity.status(400).body("Error during registration");
        }
    }

    // 특정 ID를 가진 회원을 조회
    @GetMapping("/members/{id}")
    public Member getMemberDetail(@PathVariable Long id) {
        return memberService.getMemberById(id);
    }

    // 회원 삭제
    @DeleteMapping("/members/{id}")
    public String deleteMember(@PathVariable Long id) {
        boolean isDeleted = memberService.deleteMember(id);
        if (isDeleted) {
            return "Member deleted successfully";
        } else {
            return "Member not found";
        }
    }

    // 회원 정보 수정
    @PutMapping("/members/{id}")
    public Member updateMember(@PathVariable Long id, @RequestBody Member member) {
        return memberService.updateMember(id, member);
    }
}
