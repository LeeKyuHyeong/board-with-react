package kh.react.board.member.repository;

import kh.react.board.member.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends PagingAndSortingRepository<Member, String>, JpaRepository<Member, String> {

    List<Member> findByNameContaining(String name);  // 이름으로 검색
    List<Member> findByEmailContaining(String email);  // 이메일로 검색
    List<Member> findByNameContainingAndEmailContaining(String name, String email);  // 이름과 이메일로 검색

    @Override
    boolean existsById(String s);

    Optional<Member> findByEmail(String email);

}
