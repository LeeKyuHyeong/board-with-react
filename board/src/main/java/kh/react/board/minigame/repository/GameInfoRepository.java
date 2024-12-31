package kh.react.board.minigame.repository;

import kh.react.board.minigame.model.GameInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameInfoRepository extends JpaRepository<GameInfo, String> {
}
