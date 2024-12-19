package kh.react.board.batch.repository;

import kh.react.board.batch.model.BatchHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BatchHistoryRepository extends JpaRepository<BatchHistory, Long> {
}
