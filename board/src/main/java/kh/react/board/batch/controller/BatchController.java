package kh.react.board.batch.controller;

import kh.react.board.batch.model.BatchDefinition;
import kh.react.board.batch.model.BatchHistory;
import kh.react.board.batch.repository.BatchDefinitionRepository;
import kh.react.board.batch.repository.BatchHistoryRepository;
import kh.react.board.batch.service.BatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/batch")
public class BatchController {

    @Autowired
    private BatchHistoryRepository batchHistoryRepository;

    @Autowired
    private BatchDefinitionRepository batchDefinitionRepository;

    @Autowired
    private BatchService batchService;

    // 배치 정의 시작

    // 배치 정의 저장
    @PostMapping("/definitions/")
    public ResponseEntity<String> registerBatch(@RequestBody BatchDefinition batchDefinition) {

        try {
            batchService.registerBatch(batchDefinition);
            return ResponseEntity.ok("Batch registered successfully");
        } catch(IllegalArgumentException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 배치 정의 조회
    @GetMapping("/definitions/")
    public List<BatchDefinition> getAllBatchDefinitions() {
        return batchDefinitionRepository.findAll();
    }

    // 배치 정의 끝

    // 배치 이력 시작

    // 배치 이력 조회
    @GetMapping("/histories/")
    public List<BatchHistory> getAllBatchHistories() {
        return batchHistoryRepository.findAll();
    }
    
    // 배치 이력 끝
    


}
