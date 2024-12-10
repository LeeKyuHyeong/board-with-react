package kh.react.board.member.service;

import kh.react.board.member.model.Member;
import kh.react.board.member.repository.MemberRepository;
import kh.react.board.util.PagingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MemberService {

    private List<Member> members = new ArrayList<>();

    @Autowired
    private MemberRepository memberRepository;

    public int findAllCount() {
        return (int) memberRepository.count();
    }



    // 회원 목록 조회 (페이징 처리)
    public Page<Member> getMembers(int page, int size, String name, String email) {

        List<Member> members;

        if (name != null && email != null) {
            members = memberRepository.findByNameContainingAndEmailContaining(name, email);
        } else if (name != null) {
            members = memberRepository.findByNameContaining(name);
        } else if (email != null) {
            members = memberRepository.findByEmailContaining(email);
        } else {
            members = memberRepository.findAll();  // 조건이 없으면 모든 회원 조회
        }

        // PagingUtil을 사용하여 페이징 처리된 데이터 반환
        return PagingUtil.getPagedData(members, page, size);
    }



    // 총 사용자 수 반환
    public long countMembers() {
        return members.size();
    }

    // 사용자 저장
    public Member saveMember(Member member) {
        return memberRepository.save(member);
    }

    public boolean registerMember(Member member) {
        // 예시: 데이터베이스에 유저를 추가하는 로직 (임시로 성공 처리)
        memberRepository.save(member);

        System.out.println("Member registered: " + member.getName());
        return true;
    }

    // 특정 ID를 가진 회원을 조회
    public Member getMemberById(Long id) {
        return memberRepository.findById(id).orElseThrow(() -> new RuntimeException("Member not found"));
    }

    // 회원 삭제
    public boolean deleteMember(Long id) {
        if (memberRepository.existsById(id)) {
            memberRepository.deleteById(id);
            return true;
        }
        return false;
    }
    // 회원 정보 수정
    public Member updateMember(Long id, Member updatedMember) {
        if (memberRepository.existsById(id)) {
            updatedMember.setId(id);  // 기존 ID를 유지
            return memberRepository.save(updatedMember); // DB에 저장된 회원 정보 업데이트
        }
        throw new RuntimeException("Member not found");
    }
}
