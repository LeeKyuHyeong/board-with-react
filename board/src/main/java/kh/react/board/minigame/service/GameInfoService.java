package kh.react.board.minigame.service;

import kh.react.board.minigame.model.GameInfo;
import kh.react.board.minigame.repository.GameInfoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GameInfoService {

    private final GameInfoRepository gameInfoRepository;

    public GameInfoService(GameInfoRepository gameInfoRepository) {
        this.gameInfoRepository = gameInfoRepository;
    }

    public List<GameInfo> getAllGames() {
        return gameInfoRepository.findAll();
    }

    // 게임 정보 업데이트
    public void updateGameInfo(String id, GameInfo updatedGame) {
        System.out.println("service getName : " + updatedGame.getName());
        Optional<GameInfo> existingGameOpt = gameInfoRepository.findById(id);
        if (existingGameOpt.isPresent()) {
            GameInfo existingGame = existingGameOpt.get();
            existingGame.setName(updatedGame.getName());
            existingGame.setPath(updatedGame.getPath());
            existingGame.setDescription(updatedGame.getDescription());
            existingGame.setModDt(updatedGame.getModDt());
            existingGame.setModId(updatedGame.getModId());
            gameInfoRepository.save(existingGame);
        }
    }
}
