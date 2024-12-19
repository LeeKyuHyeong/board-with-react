package kh.react.board.batch.repository;

import kh.react.board.batch.model.BatchDefinition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BatchDefinitionRepository extends JpaRepository<BatchDefinition, String> {

}
