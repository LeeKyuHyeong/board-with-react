package kh.react.board.batch.service;

import kh.react.board.batch.model.BatchHistory;
import kh.react.board.naver.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class NewsBatchService {

    @Autowired
    private NewsService newsService;

    @Autowired
    private BatchService batchService;

    @Scheduled(cron = "0 10 0/1 1/1 * *") // 10분에 1시간마다 야구기사
    public void fetchAndSaveBaseballNews() {
        Long batchHistId = null;
        try {
            // 배치 시작 기록
            BatchHistory batchHistory = batchService.startBatch("FetchAndSaveBaseballNews");
            batchHistId = batchHistory.getId();

            // 뉴스 데이터를 가져오고 저장
            int result = newsService.fetchAndSaveBaseballNews();

            System.out.println("batch result : " + result);
            // 배치 성공 기록
            batchService.completeBatch(batchHistId, true, null, "야구기사 " + result + "개 insert");

        } catch (Exception e) {
            e.printStackTrace();
            // 배치 실패 기록
            if (batchHistId != null) {
                batchService.completeBatch(batchHistId, false, e.getMessage(), null);
            }
        }
    }
    @Scheduled(cron = "0 20 0/1 1/1 * *") // 20분에 1시간마다 축구 기사
    public void fetchAndSaveSoccerNews () {
        Long batchHistId = null;
        try {
            // 배치 시작 기록
            BatchHistory batchHistory = batchService.startBatch("FetchAndSaveSoccerNews");
            batchHistId = batchHistory.getId();

            // 뉴스 데이터를 가져오고 저장
            int result = newsService.fetchAndSaveSoccerNews();

            System.out.println("batch result : " + result);
            // 배치 성공 기록
            batchService.completeBatch(batchHistId, true, null, "축구기사 " + result + "개 insert");

        } catch (Exception e) {
            e.printStackTrace();
            // 배치 실패 기록
            if (batchHistId != null) {
                batchService.completeBatch(batchHistId, false, e.getMessage(), null);
            }
        }
    }

    @Scheduled(cron = "0 30 0/1 1/1 * *") // 30분에 1시간마다 배구 기사
    public void fetchAndSaveVolleyballNews () {
        Long batchHistId = null;
        try {
            // 배치 시작 기록
            BatchHistory batchHistory = batchService.startBatch("fetchAndSaveVolleyballNews");
            batchHistId = batchHistory.getId();

            // 뉴스 데이터를 가져오고 저장
            int result = newsService.fetchAndSaveVolleyballNews();

            System.out.println("batch result : " + result);
            // 배치 성공 기록
            batchService.completeBatch(batchHistId, true, null, "배구기사 " + result + "개 insert");

        } catch (Exception e) {
            e.printStackTrace();
            // 배치 실패 기록
            if (batchHistId != null) {
                batchService.completeBatch(batchHistId, false, e.getMessage(), null);
            }
        }
    }
}
