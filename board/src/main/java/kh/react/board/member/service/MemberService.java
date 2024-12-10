package kh.react.board.member.service;

import kh.react.board.member.model.Member;
import kh.react.board.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {
    @Autowired
    private MemberRepository memberRepository;

    // 모든 사용자 조회
    public List<Member> getAllUsers() {
        return memberRepository.findAll();
    }

    // 사용자 저장
    public Member saveUser(Member member) {
        return memberRepository.save(member);
    }

    public boolean registerUser(Member member) {
        // 예시: 데이터베이스에 유저를 추가하는 로직 (임시로 성공 처리)
        memberRepository.save(member);

        System.out.println("Member registered: " + member.getName());
        return true;
    }

}
