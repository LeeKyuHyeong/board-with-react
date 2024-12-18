package kh.react.board.naver.controller;

import kh.react.board.naver.service.NaverNewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping("/baseball/")
    public List<Map<String, Object>> getBaseballNews() {
        return naverNewsService.getBaseballNews();
    }
}
