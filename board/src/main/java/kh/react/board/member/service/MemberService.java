package kh.react.board.member.service;

import kh.react.board.member.model.Member;
import kh.react.board.member.repository.MemberRepository;
import kh.react.board.util.PagingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MemberService {

    private final List<Member> members = new ArrayList<>();

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

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

    // 회원가입
    public void registerMember(Member member) {

        if (memberRepository.existsById(member.getId())) {
            throw new IllegalArgumentException("ID is already in use.");
        }
        // 비밀번호 암호화
        member.setPassword(passwordEncoder.encode(member.getPassword()));

        // 사용자 저장
        memberRepository.save(member);

    }

    // 비밀번호 초기화
    public void resetPassword(Member member) {

        Member findMem = memberRepository.findByEmail(member.getEmail()).orElseThrow(() -> new IllegalArgumentException("there's no member with this email."));

        if(findMem != null && findMem.getName().equals(member.getName())) {
            // 비밀번호 암호화
            member.setPassword(passwordEncoder.encode("12345"));

            member.setId(findMem.getId());

            member.setRole(findMem.getRole());
            // 사용자 저장
            memberRepository.save(member);

        } else {
            throw new IllegalArgumentException("name and email does not match.");
        }
    }

    // 특정 ID를 가진 회원을 조회
    public Member getMemberById(String id) {
        return memberRepository.findById(id).orElseThrow(() -> new RuntimeException("Member not found"));
    }

    // 회원 삭제
    public boolean deleteMember(String id) {
        if (memberRepository.existsById(id)) {
            memberRepository.deleteById(id);
            return true;
        }
        return false;
    }
    // 회원 정보 수정
    public Member updateMember(String id, Member updatedMember) {
        if (memberRepository.existsById(id)) {
            updatedMember.setId(id);  // 기존 ID를 유지
            updatedMember.setPassword(passwordEncoder.encode(updatedMember.getPassword()));  // 비밀번호 암호화
            return memberRepository.save(updatedMember); // DB에 저장된 회원 정보 업데이트
        }
        throw new RuntimeException("Member not found");
    }
}
