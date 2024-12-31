package kh.react.board.minigame.repository;

import kh.react.board.minigame.model.BodyLanguageItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BodyLanguageItemRepository extends JpaRepository<BodyLanguageItem, Integer> {
    List<BodyLanguageItem> findByGroupId(Integer groupId);
}

