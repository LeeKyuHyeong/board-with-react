package kh.react.board;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @GetMapping("/{path:[^\\.]*}") // 모든 경로를 React로 전달
    public String redirect() {
        return "forward:/index.html";
    }
}
