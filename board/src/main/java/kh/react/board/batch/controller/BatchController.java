package kh.react.board.batch.controller;

import kh.react.board.batch.model.BatchDefinition;
import kh.react.board.batch.model.BatchHistory;
import kh.react.board.batch.repository.BatchDefinitionRepository;
import kh.react.board.batch.repository.BatchHistoryRepository;
import kh.react.board.batch.service.BatchService;
import kh.react.board.naver.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @Autowired
    private NewsService newsService;

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


    // 배치 직접 실행
    @PostMapping("/definitions/run/{batchId}")
    public ResponseEntity<String> runBatchManually(@PathVariable String batchId) {

        String newsType = switch (batchId) {
            case "FetchAndSaveBaseballNews" -> "baseball";
            case "FetchAndSaveSoccerNews" -> "soccer";
            case "FetchAndSaveVolleyballNews" -> "volleyball";
            default -> "";
        };

        Long batchHistId = null;
        try {
            // 배치 시작 기록
            BatchHistory batchHistory = batchService.startBatch(batchId);
            batchHistId = batchHistory.getId();

            // 뉴스 데이터를 가져오고 저장
            int result = newsService.fetchAndSaveNews(newsType);

            // 배치 성공 기록
            batchService.completeBatch(batchHistId, true, null, newsType + " " + result + "개 직접 insert");
            return ResponseEntity.ok("Batch executed successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            // 배치 실패 기록
            if (batchHistId != null) {
                batchService.completeBatch(batchHistId, false, e.getMessage(), null);
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to execute batch: " + e.getMessage());
        }
    }
}
