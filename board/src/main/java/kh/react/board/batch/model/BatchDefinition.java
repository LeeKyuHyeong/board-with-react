package kh.react.board.batch.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "batch_definition")
public class BatchDefinition {

    @Id
    private String batchId;

    @Column(nullable = false)
    private String batchName;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String scheduledTime;

    @Column(nullable = false)
    private int successCount;

    @Column(nullable = false)
    private int failureCount;

    // Getters and Setters

    public String getBatchId() {
        return batchId;
    }

    public void setBatchId(String batchId) {
        this.batchId = batchId;
    }

    public String getBatchName() {
        return batchName;
    }

    public void setBatchName(String batchName) {
        this.batchName = batchName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getScheduledTime() { return scheduledTime; }

    public void setScheduledTime(String scheduledTime) {
        this.scheduledTime = scheduledTime;
    }

    public int getSuccessCount() {
        return successCount;
    }

    public void setSuccessCount(int successCount) {
        this.successCount = successCount;
    }

    public int getFailureCount() {
        return failureCount;
    }

    public void setFailureCount(int failureCount) {
        this.failureCount = failureCount;
    }
}
