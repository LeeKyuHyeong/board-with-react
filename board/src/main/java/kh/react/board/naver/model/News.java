package kh.react.board.naver.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "news")
public class News {
    @Id
    @Column(nullable = false, unique = true)
    private String originalLink; // Primary Key (API의 link 값 사용)

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String newsType; // 구분자 (예: baseball)

    @Column(nullable = false)
    private LocalDate createdDate; // 저장 날짜

    @Temporal(TemporalType.DATE) // 날짜 형식 지정
    private Date pubDate;  // 보도 날짜

    // Getters and Setters
    public Date getPubDate() {
        return pubDate;
    }

    public void setPubDate(Date pubDate) {
        this.pubDate = pubDate;
    }

    public String getOriginalLink() {
        return originalLink;
    }

    public void setOriginalLink(String originalLink) {
        this.originalLink = originalLink;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNewsType() {
        return newsType;
    }

    public void setNewsType(String newsType) {
        this.newsType = newsType;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }
}
