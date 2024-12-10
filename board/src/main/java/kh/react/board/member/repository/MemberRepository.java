package kh.react.board.member.repository;

import kh.react.board.member.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface MemberRepository extends PagingAndSortingRepository<Member, Long>, JpaRepository<Member, Long> {

    List<Member> findByNameContaining(String name);  // 이름으로 검색
    List<Member> findByEmailContaining(String email);  // 이메일로 검색
    List<Member> findByNameContainingAndEmailContaining(String name, String email);  // 이름과 이메일로 검색
}
