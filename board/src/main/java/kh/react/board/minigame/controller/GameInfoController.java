package kh.react.board.minigame.controller;

import kh.react.board.minigame.model.GameInfo;
import kh.react.board.minigame.service.GameInfoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GameInfoController {

    private final GameInfoService gameInfoService;

    public GameInfoController(GameInfoService gameInfoService) {
        this.gameInfoService = gameInfoService;
    }

    @GetMapping
    public List<GameInfo> getAllGames() {
        return gameInfoService.getAllGames();
    }

    // 게임 정보 수정
    @PutMapping("/{id}")
    public ResponseEntity<String> updateGameInfo(
            @PathVariable String id,
            @RequestBody GameInfo updatedGame) {
        System.out.println("update game id : " + id);

        gameInfoService.updateGameInfo(id, updatedGame);
        return ResponseEntity.ok("Game info updated successfully");
    }
}
