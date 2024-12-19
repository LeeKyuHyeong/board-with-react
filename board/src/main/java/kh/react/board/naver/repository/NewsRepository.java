package kh.react.board.naver.repository;

import kh.react.board.naver.model.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<News, String> {
    List<News> findByNewsTypeAndCreatedDate(String newsType, LocalDate createdDate);

    Page<News> findByNewsTypeAndPubDateAndTitleContaining(String newsType, Date pubDate, String title, Pageable pageable);

}
