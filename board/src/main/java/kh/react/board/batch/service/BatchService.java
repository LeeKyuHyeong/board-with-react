package kh.react.board.batch.service;

import kh.react.board.batch.model.BatchDefinition;
import kh.react.board.batch.model.BatchHistory;
import kh.react.board.batch.repository.BatchDefinitionRepository;
import kh.react.board.batch.repository.BatchHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class BatchService {

    @Autowired
    private BatchHistoryRepository batchHistoryRepository;

    @Autowired
    private BatchDefinitionRepository batchDefinitionRepository;

    //배치 시작 시간 저장
    public BatchHistory startBatch(String batchId) {

        BatchDefinition batchDefinition = batchDefinitionRepository.findById(batchId)
                .orElseThrow(() -> new IllegalArgumentException("BatchDefinition ID not match"));

        BatchHistory batchHistory = new BatchHistory();
        batchHistory.setBatchId(batchId);
        batchHistory.setBatchName(batchDefinition.getBatchName());
        batchHistory.setStartTime(LocalDateTime.now());
        batchHistory.setStatus("RUNNING");
        return batchHistoryRepository.save(batchHistory);
    }

    //배치 종료 시간 저장
    public void completeBatch(Long batchHistId, boolean isSuccess, String errorCode, String remarks) {
        BatchHistory batchHistory = batchHistoryRepository.findById(batchHistId)
                .orElseThrow(() -> new IllegalArgumentException("BatchHistory ID not found: " + batchHistId));

        batchHistory.setEndTime(LocalDateTime.now());
        batchHistory.setStatus(isSuccess ? "SUCCESS" : "FAILURE");
        batchHistory.setErrorCode(errorCode);
        batchHistory.setRemarks(remarks);
        batchHistoryRepository.save(batchHistory);
    }

    // 배치 저장
    public void registerBatch(BatchDefinition batchDefinition) {

        if (batchDefinitionRepository.existsById(batchDefinition.getBatchId())) {
            throw new IllegalArgumentException("BatchId is already in use.");
        }

        // 배치 저장
        batchDefinitionRepository.save(batchDefinition);

    }

}
