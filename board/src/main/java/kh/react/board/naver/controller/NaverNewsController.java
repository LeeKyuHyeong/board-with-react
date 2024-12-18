package kh.react.board.naver.controller;

import kh.react.board.naver.service.NaverNewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;



@RestController
@RequestMapping("/api/news")
public class NaverNewsController {
    final String clientId = "";
    @Autowired
    private NaverNewsService naverNewsService;

    @GetMapping("/baseball/{size}")
    public List<Map<String, Object>> getBaseballNews(@PathVariable int size) {
        return naverNewsService.getBaseballNews(size);
    }

    @GetMapping("/volleyball/{size}")
    public List<Map<String, Object>> getVolleyballNews(@PathVariable int size) {
        return naverNewsService.getVolleyballNews(size);
    }

    @GetMapping("/soccer/{size}")
    public List<Map<String, Object>> getSoccerNews(@PathVariable int size) {
        return naverNewsService.getSoccerNews(size);
    }
}
