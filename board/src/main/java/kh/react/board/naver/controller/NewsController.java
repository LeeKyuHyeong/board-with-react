package kh.react.board.naver.controller;

import kh.react.board.naver.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;



@RestController
@RequestMapping("/api/news")
public class NewsController {
    final String clientId = "";
    @Autowired
    private NewsService newsService;

    @GetMapping("/baseball/{size}")
    public List<Map<String, Object>> getBaseballNews(@PathVariable int size) {
        return newsService.getBaseballNews(size);
    }

    @GetMapping("/volleyball/{size}")
    public List<Map<String, Object>> getVolleyballNews(@PathVariable int size) {
        return newsService.getVolleyballNews(size);
    }

    @GetMapping("/soccer/{size}")
    public List<Map<String, Object>> getSoccerNews(@PathVariable int size) {
        return newsService.getSoccerNews(size);
    }

    @GetMapping("/floorball/{size}")
    public List<Map<String, Object>> getFloorballNews(@PathVariable int size) {
        return newsService.getFloorballNews(size);
    }

    @GetMapping("/frisbee/{size}")
    public List<Map<String, Object>> getFrisbeeNews(@PathVariable int size) {
        return newsService.getFrisbeeNews(size);
    }
}
