package kh.react.board.naver.repository;

import kh.react.board.naver.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<News, String> {
    List<News> findByNewsTypeAndCreatedDate(String newsType, LocalDate createdDate);
}
