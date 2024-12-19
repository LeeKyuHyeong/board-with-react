package kh.react.board.naver.controller;

import kh.react.board.naver.model.News;
import kh.react.board.naver.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;



@RestController
@RequestMapping("/api/news")
public class NewsController {
    @Autowired
    private NewsService newsService;

    @GetMapping("/baseball")
    public Page<News> getNews(@RequestParam String newsType,
                              @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date pubDate,
                              @RequestParam(required = false, defaultValue = "") String title,
                              Pageable pageable) {
        return newsService.getFilteredNews(newsType, pubDate, title, pageable);
    }


}
