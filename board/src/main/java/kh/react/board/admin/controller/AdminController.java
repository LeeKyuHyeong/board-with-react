package kh.react.board.admin.controller;

import kh.react.board.member.model.Member;
import kh.react.board.member.repository.MemberRepository;
import kh.react.board.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class AdminController {
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MemberService memberService;

    // Admin 전용 API: 모든 사용자 조회
    @GetMapping("/admin/members")
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

    // Admin 전용 API: 특정 사용자 삭제
    @DeleteMapping("/admin/members/{id}")
    public String deleteMember(@PathVariable String id) {
        memberRepository.deleteById(id);
        return "Member deleted successfully";
    }
}
